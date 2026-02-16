import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PasswordField from '@/components/common/PasswordField.vue'

describe('PasswordField', () => {
  it('affiche/masque le mot de passe', async () => {
    const wrapper = mount(PasswordField, {
      props: {
        modelValue: 'Secret123!',
      },
    })

    expect(wrapper.get('input').attributes('type')).toBe('password')

    await wrapper.get('button').trigger('click')
    expect(wrapper.get('input').attributes('type')).toBe('text')
  })

  it('emet update:modelValue a la saisie', async () => {
    const wrapper = mount(PasswordField, {
      props: {
        modelValue: '',
      },
    })

    await wrapper.get('input').setValue('NewValue123!')
    expect(wrapper.emitted('update:modelValue')).toEqual([['NewValue123!']])
  })
})
