export default function editProfileForm() {
    return (
        <form>
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div>
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio"></textarea>
        </div>
        <button type="submit">Save Changes</button>
        </form>
    );
}