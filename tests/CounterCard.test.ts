import { render, fireEvent, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import CounterCard from '@/components/CounterCard.vue'

test('increments and decrements', async () => {
  render(CounterCard, { global: { plugins: [createTestingPinia()] } })
  const count = await screen.findByTestId('count')
  expect(count.textContent).toBe('0')
  const [dec, inc] = screen.getAllByRole('button')
  await fireEvent.click(inc); expect(count.textContent).toBe('1')
  await fireEvent.click(dec); expect(count.textContent).toBe('0')
})