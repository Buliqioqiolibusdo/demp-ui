<script lang="ts">
import {defineComponent, h, PropType} from 'vue';
import FaIconButton from '@/components/button/FaIconButton.vue';

export default defineComponent({
  name: 'TableCell',
  props: {
    column: {
      type: Object as PropType<TableColumn>,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    }
  },
  emits: [
    'click',
  ],
  setup: function (props: TableCellProps) {
    const getChildren = () => {
      const {row, column, rowIndex} = props;
      const {value, buttons} = column;

      // buttons
      if (buttons) {
        let _buttons: TableColumnButton[] = [];
        if (typeof buttons === 'function') {
          _buttons = buttons(row);
        } else if (Array.isArray(buttons) && buttons.length > 0) {
          _buttons = buttons;
        }

        return _buttons.map(btn => {
          const {tooltip, type, size, icon, disabled, onClick} = btn;
          const props = {
            key: JSON.stringify({tooltip, type, size, icon}),
            tooltip: typeof tooltip === 'function' ? tooltip(row) : tooltip,
            type,
            size,
            icon,
            disabled: disabled?.(row),
            onClick: () => {
              onClick?.(row, rowIndex, column);
            },
          };
          // FIXME: use "as any" to fix type errors temporarily
          return h(FaIconButton, props as any);
        });
      }

      // normalized value
      let normalizedValue = value || row[column.key];
      switch (typeof normalizedValue) {
        case 'undefined':
          return '';
        case 'function':
          return [normalizedValue(row, rowIndex, column)];
        case 'object':
          return JSON.stringify(normalizedValue);
        default:
          return normalizedValue;
      }
    };

    return () => h('div', getChildren());
  },
});
</script>

<style lang="scss" scoped>

</style>
