<template>
  <label class="select" for="sort">
    <span class="select__label">Сортировать по:</span>
    <select id="sort" v-model="localSelectedSort" class="select__wrapper">
      <option
        v-for="sort in localSort"
        :key="sort.keySort"
        :value="sort.keySort"
        class="select__option"
      >
        {{ sort.name }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { SortEnum } from "@/enums/SortEnum";

interface SortProps {
  selectedSort?: SortEnum;
}
const props = withDefaults(defineProps<SortProps>(), {
  selectedSort: SortEnum.SORT_DEFAULT
});

const emit = defineEmits<{
  (e: "update:selected-sort", value: SortEnum): void;
}>();

const localSort = [
  {
    keySort: SortEnum.SORT_DEFAULT,
    name: "Без сортировки"
  },
  {
    keySort: SortEnum.SORT_ASC,
    name: "Цена по возрастанию"
  },
  {
    keySort: SortEnum.SORT_DESC,
    name: "Цена по убыванию"
  }
];

const localSelectedSort = ref(props.selectedSort);

watch(localSelectedSort, (newSort) => {
  localSelectedSort.value = newSort;
  emit("update:selected-sort", newSort);
});
</script>
