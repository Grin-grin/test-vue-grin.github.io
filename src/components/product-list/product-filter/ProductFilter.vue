<template>
  <label class="select" for="filter">
    <span class="select__label">Материал</span>
    <select id="filter" v-model="localSelectedFilter" class="select__wrapper">
      <option value="-1" class="select__option">Без фильтров</option>
      <option
        v-for="filter in props.filters"
        :key="filter.id"
        :value="filter.id"
      >
        {{ filter.name }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import IMaterial from "@/interfaces/materials/IMaterial";
import { ref, watch } from "vue";
interface FilterProps {
  filters: Array<IMaterial>;
  selectedFilter?: number;
}
const props = withDefaults(defineProps<FilterProps>(), {
  filters: () => {
    return new Array<IMaterial>();
  },
  selectedFilter: -1
});

const emit = defineEmits<{
  (e: "update:selected-filter", value: number): void;
}>();

const localSelectedFilter = ref(props.selectedFilter);

watch(localSelectedFilter, (newFilter) => {
  console.log(localSelectedFilter);
  localSelectedFilter.value = newFilter;
  emit("update:selected-filter", Number(newFilter));
});
</script>
