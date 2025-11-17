import { defineComponent, h } from 'vue'

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export const Table = defineComponent({
  name: 'VTable',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'relative w-full overflow-x-auto', 'data-slot': 'table-container' }, [
        h('table', { class: cn('w-full caption-bottom text-sm', props.class) }, slots.default?.())
      ])
  }
})

export const TableHeader = defineComponent({
  name: 'TableHeader',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h('thead', { class: cn('[&_tr]:border-b border-gray-200', props.class) }, slots.default?.())
  }
})

export const TableBody = defineComponent({
  name: 'TableBody',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h('tbody', { class: cn('[&_tr:last-child]:border-0', props.class) }, slots.default?.())
  }
})

export const TableRow = defineComponent({
  name: 'TableRow',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'tr',
        {
          class: cn(
            'hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-gray-200 transition-colors',
            props.class
          )
        },
        slots.default?.()
      )
  }
})

export const TableHead = defineComponent({
  name: 'TableHead',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'th',
        {
          class: cn(
            'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
            props.class
          )
        },
        slots.default?.()
      )
  }
})

export const TableCell = defineComponent({
  name: 'TableCell',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'td',
        {
          class: cn(
            'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
            props.class
          )
        },
        slots.default?.()
      )
  }
})

export const TableCaption = defineComponent({
  name: 'TableCaption',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h('caption', { class: cn('text-muted-foreground mt-4 text-sm', props.class) }, slots.default?.())
  }
})
