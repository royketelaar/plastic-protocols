/**
 * "My action plan" — a list of protocol slugs the user has saved.
 * State is shared via useState; hydration + persistence to localStorage
 * happens once in plugins/plan.client.ts.
 */
export function usePlan() {
  const plan = useState<string[]>('pp-plan', () => [])

  const has = (slug: string) => plan.value.includes(slug)

  const toggle = (slug: string) => {
    plan.value = has(slug) ? plan.value.filter((s) => s !== slug) : [...plan.value, slug]
  }

  const clear = () => {
    plan.value = []
  }

  return {
    plan,
    has,
    toggle,
    clear,
    count: computed(() => plan.value.length),
  }
}
