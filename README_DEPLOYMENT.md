# Deployment Guide - Leenup Frontend (`app.leenup.com`)

## 1. Objectif
Ce document décrit un déploiement **sécurisé** du frontend Leenup via **AWS EC2** + **Nginx Proxy Manager** avec DNS géré chez **O2Switch**.

Le périmètre cible:
- Domaine public: `https://app.leenup.com`
- Frontend: Vue/Vite build statique servi par Nginx (container)
- Reverse proxy TLS: Nginx Proxy Manager (NPM)
- CI/CD: GitLab CI + GitLab Container Registry
- Serveur: EC2 unique (pas de cluster)

## 2. Décisions figées
1. DNS O2Switch: enregistrement `A` de `app.leenup.com` vers une **Elastic IP** AWS.
2. CI/CD: GitLab CI + GitLab Registry.
3. Base API frontend prod: `VITE_API_BASE_URL=https://leenup-api.benjamin-gleitz.com`.
4. Reverse proxy: Nginx Proxy Manager.

## 3. Architecture de déploiement
1. Push/merge sur `main`.
2. GitLab CI build l'image Docker du frontend.
3. GitLab CI push l'image dans le GitLab Container Registry.
4. Job deploy SSH sur EC2.
5. EC2 exécute `docker compose pull && docker compose up -d`.
6. NPM sert `app.leenup.com` en HTTPS vers le container frontend.

## 4. Pré-requis
- Compte AWS avec droits EC2 + Elastic IP.
- Accès O2Switch DNS pour la zone `leenup.com`.
- Projet GitLab avec Registry actif.
- Runner GitLab `prod` disponible.
- Clé SSH dédiée au déploiement.

## 5. Phase A - DNS O2Switch (à faire en premier)

### 5.1 Réserver une Elastic IP AWS
- Région: `eu-west-3`.
- Associer l'Elastic IP à l'instance EC2 de production.

### 5.2 Créer l'enregistrement DNS
Dans la zone DNS O2Switch de `leenup.com`:
- Type: `A`
- Nom: `app`
- Cible: `<EC2_ELASTIC_IP>`
- TTL: `300`

### 5.3 Vérifier la propagation
```bash
nslookup app.leenup.com
```
Résultat attendu: l'IP retournée est `<EC2_ELASTIC_IP>`.

## 6. Phase B - EC2 (provisionnement et durcissement)

### 6.1 Instance EC2
- OS recommandé: Ubuntu 22.04 LTS (ou 24.04 LTS).
- Associer immédiatement l'Elastic IP.

### 6.2 Security Group (strict)
Inbound:
- `22/tcp` -> **ton IP admin uniquement** (`x.x.x.x/32`)
- `80/tcp` -> `0.0.0.0/0`
- `443/tcp` -> `0.0.0.0/0`
- Ne pas exposer `81/tcp`

### 6.3 Mises à jour système
```bash
sudo apt update && sudo apt -y upgrade
```

### 6.4 Utilisateur de déploiement
```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
```

### 6.5 Durcissement SSH
Éditer `/etc/ssh/sshd_config`:
```txt
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```
Puis:
```bash
sudo systemctl restart ssh
```

### 6.6 Firewall UFW
```bash
sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 6.7 Fail2ban
```bash
sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
```

### 6.8 Installer Docker + Compose plugin
```bash
curl -fsSL https://get.docker.com | sudo sh
sudo systemctl enable --now docker
sudo usermod -aG docker deploy
```
Reconnecte-toi ensuite avec l'utilisateur `deploy`.

## 7. Phase C - Reverse Proxy Nginx Proxy Manager

### 7.1 Réseau Docker partagé
```bash
docker network create front-end
```

### 7.2 Fichier compose NPM
Créer `/srv/npm/compose.yml`:
```yaml
services:
  npm:
    image: jc21/nginx-proxy-manager:latest
    container_name: npm
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "127.0.0.1:81:81"
    volumes:
      - npm-data:/data
      - npm-letsencrypt:/etc/letsencrypt
    networks:
      - front-end

volumes:
  npm-data:
  npm-letsencrypt:

networks:
  front-end:
    external: true
```

Démarrage:
```bash
cd /srv/npm
docker compose -f compose.yml up -d
```

### 7.3 Accès admin NPM via tunnel SSH
Depuis ton poste local:
```bash
ssh -L 8181:127.0.0.1:81 deploy@<EC2_ELASTIC_IP>
```
Puis ouvrir: `http://127.0.0.1:8181`

### 7.4 Créer le Proxy Host
Dans NPM:
- Domain Names: `app.leenup.com`
- Forward Hostname/IP: `leenup-front`
- Forward Port: `80`
- Websockets Support: ON
- SSL: Let's Encrypt + Force SSL + HTTP/2

## 8. Phase D - Frontend container

### 8.1 Dockerfile (racine du repo)
Créer `Dockerfile`:
```dockerfile
# -------- Build --------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variables de build Vite (injectées par CI)
ARG VITE_API_BASE_URL
ARG VITE_AUTH_LOGIN_PATH=/auth/login
ARG VITE_AUTH_ME_PATH=/me
ARG VITE_AUTH_EMAIL_PATH=/auth/login/email
ARG VITE_AUTH_GOOGLE_PATH=/auth/login/google
ARG VITE_AUTH_REGISTER_PATH=/register
ARG VITE_AUTH_CHANGE_PASSWORD_PATH=/me/change-password

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_AUTH_LOGIN_PATH=${VITE_AUTH_LOGIN_PATH}
ENV VITE_AUTH_ME_PATH=${VITE_AUTH_ME_PATH}
ENV VITE_AUTH_EMAIL_PATH=${VITE_AUTH_EMAIL_PATH}
ENV VITE_AUTH_GOOGLE_PATH=${VITE_AUTH_GOOGLE_PATH}
ENV VITE_AUTH_REGISTER_PATH=${VITE_AUTH_REGISTER_PATH}
ENV VITE_AUTH_CHANGE_PASSWORD_PATH=${VITE_AUTH_CHANGE_PASSWORD_PATH}

RUN npm run build

# -------- Runtime --------
FROM nginx:alpine
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 8.2 Configuration Nginx SPA fallback
Créer `deploy/nginx/default.conf`:
```nginx
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

### 8.3 Compose frontend sur EC2
Créer `/srv/leenup-front/compose.yml`:
```yaml
services:
  leenup-front:
    image: registry.gitlab.com/<group>/<project>:latest
    container_name: leenup-front
    restart: unless-stopped
    networks:
      - front-end

networks:
  front-end:
    external: true
```

## 9. Phase E - CI/CD GitLab sécurisé

### 9.1 Pipeline `.gitlab-ci.yml`
Créer `.gitlab-ci.yml` à la racine:
```yaml
stages:
  - build
  - deploy

build_image:
  stage: build
  image: moby/buildkit:rootless
  variables:
    BUILDKITD_FLAGS: "--oci-worker-no-process-sandbox"
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
  script:
    - test -n "$VITE_API_BASE_URL"
    - mkdir -p ~/.docker
    - |
      cat > ~/.docker/config.json <<EOF
      { "auths": { "${CI_REGISTRY}": { "username": "${CI_REGISTRY_USER}", "password": "${CI_REGISTRY_PASSWORD}" } } }
      EOF
    - |
      buildctl-daemonless.sh build \
        --frontend dockerfile.v0 \
        --local context=. \
        --local dockerfile=. \
        --opt build-arg:VITE_API_BASE_URL=${VITE_API_BASE_URL} \
        --opt build-arg:VITE_AUTH_LOGIN_PATH=${VITE_AUTH_LOGIN_PATH} \
        --opt build-arg:VITE_AUTH_ME_PATH=${VITE_AUTH_ME_PATH} \
        --opt build-arg:VITE_AUTH_EMAIL_PATH=${VITE_AUTH_EMAIL_PATH} \
        --opt build-arg:VITE_AUTH_GOOGLE_PATH=${VITE_AUTH_GOOGLE_PATH} \
        --opt build-arg:VITE_AUTH_REGISTER_PATH=${VITE_AUTH_REGISTER_PATH} \
        --opt build-arg:VITE_AUTH_CHANGE_PASSWORD_PATH=${VITE_AUTH_CHANGE_PASSWORD_PATH} \
        --output type=image,name=${CI_REGISTRY_IMAGE}:latest,push=true \
        --output type=image,name=${CI_REGISTRY_IMAGE}:${CI_COMMIT_SHORT_SHA},push=true

deploy_prod:
  stage: deploy
  image: alpine:3.19
  tags:
    - prod
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
  before_script:
    - apk add --no-cache openssh-client
    - eval "$(ssh-agent -s)"
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh && chmod 700 ~/.ssh
    - echo "$SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
    - chmod 600 ~/.ssh/known_hosts
  script:
    - |
      ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "
        set -e
        cd '$REMOTE_APP_DIR'
        docker compose pull
        docker compose up -d
        docker image prune -f
      "
```

### 9.2 Variables GitLab CI/CD (Protected)
Définir dans `Settings > CI/CD > Variables`:
- `SSH_HOST`
- `SSH_PORT` (ex: `22`)
- `SSH_USER` (ex: `deploy`)
- `REMOTE_APP_DIR` (ex: `/srv/leenup-front`)
- `SSH_PRIVATE_KEY` (type File)
- `SSH_KNOWN_HOSTS` (clé hôte SSH pinée)
- `VITE_API_BASE_URL` = `https://leenup-api.benjamin-gleitz.com`

Optionnelles (si override des defaults):
- `VITE_AUTH_LOGIN_PATH`
- `VITE_AUTH_ME_PATH`
- `VITE_AUTH_EMAIL_PATH`
- `VITE_AUTH_GOOGLE_PATH`
- `VITE_AUTH_REGISTER_PATH`
- `VITE_AUTH_CHANGE_PASSWORD_PATH`

### 9.3 Protection GitLab
- Branche `main` protégée.
- Runner `prod`: taggé `prod`, `Protected = ON`, `Locked to project = ON`, `Run untagged jobs = OFF`.

## 10. Validation Go-Live

### 10.1 DNS
```bash
nslookup app.leenup.com
```
Doit renvoyer l'Elastic IP.

### 10.2 HTTPS
```bash
curl -I https://app.leenup.com
```
Doit renvoyer un statut `200`/`301` cohérent et certificat valide côté navigateur.

### 10.3 SPA routing
Tester en navigation directe:
- `https://app.leenup.com/auth`
- `https://app.leenup.com/auth/dashboard-mentor`

Attendu: pas de 404 Nginx.

### 10.4 Intégration API
Tester les flows auth (login/refresh/profile). Vérifier que:
- les cookies/tokens sont transmis,
- le backend autorise `https://app.leenup.com` avec credentials.

### 10.5 Surface réseau
Vérifier depuis l'extérieur:
- ports exposés: `22`, `80`, `443`
- port `81` non exposé publiquement.

## 11. Scénarios de test à couvrir
1. Merge sur `main` -> build + push image + deploy OK.
2. Push sur branche feature -> pas de `deploy_prod`.
3. Backend indisponible -> frontend gère l'erreur proprement.
4. Reboot EC2 -> NPM + frontend redémarrent automatiquement.
5. Deep-link SPA -> réponse 200.
6. Renouvellement Let's Encrypt -> service HTTPS intact.

## 12. Hypothèses
1. DNS de `leenup.com` géré chez O2Switch.
2. L'API applicative est bien sur `https://leenup-api.benjamin-gleitz.com` (et non `/docs`).
3. Registry GitLab + runner `prod` disponibles.
4. Déploiement mono-instance EC2.
5. NPM conservé comme reverse proxy principal.

## 13. Note projet (documentation)
Ce guide décrit l'état cible complet. L'implémentation effective implique ensuite la création/mise à jour des fichiers techniques suivants:
- `Dockerfile`
- `.gitlab-ci.yml`
- `deploy/nginx/default.conf`
- `deploy/npm-compose.yml`
- `deploy/front-compose.yml`
