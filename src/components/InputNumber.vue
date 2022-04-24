<template>
  <div>
    <label :for="id"
      >{{ label }}<span class="required" v-show="isRequired"> *</span></label
    >
    <input
      type="number"
      :name="id"
      :placeholder="placeholder"
      :value="modelValue"
      @blur="handleChange"
    />
    <p v-show="hasError">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { checkError } from "@/lib/checkError";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: String,
    default: "false",
  },
  modelValue: {
    type: String,
    required: true,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  validate: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue", "update:hasError"]);

const errorMessage = ref("");

const isRequired = props.required === "true";

const validation = props.validate.split("|");

const language = "en";

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);

  const { foundError: errorCheck, errorMessage: newErrorMessage } = checkError(
    target.value.trim(),
    validation,
    language
  );
  errorMessage.value = newErrorMessage;

  emit("update:hasError", errorCheck);
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin-bottom: 1rem;
}

.required {
  color: red;
}
</style>
