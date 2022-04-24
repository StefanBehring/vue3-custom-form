<template>
  <form @submit="handleSubmit">
    <InputText
      v-bind="eingabeFeld"
      v-model:model-value="eingabe.value"
      v-model:has-error="eingabe.hasError"
    />
    <InputText
      v-bind="strasseFeld"
      v-model:model-value="strasse.value"
      v-model:has-error="strasse.hasError"
    />
    <InputNumber
      v-bind="hausnummerFeld"
      v-model:model-value="hausnummer.value"
      v-model:has-error="hausnummer.hasError"
    />
    <InputText
      v-bind="ortFeld"
      v-model:model-value="ort.value"
      v-model:has-error="ort.hasError"
    />
    <p>{{ eingabe.value }} - {{ eingabe.hasError }} - {{ eingabeIsCorrect }}</p>
    <p>{{ strasse.value }} - {{ strasse.hasError }}</p>
    <p>{{ hausnummer.value }} - {{ hausnummer.hasError }}</p>
    <p>{{ ort.value }} - {{ ort.hasError }}</p>
    <div>
      <button type="submit" :disabled="disableButton">Speichern</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { reactive, ref, computed, watch } from "vue";
import InputText from "@/components/InputText.vue";
import InputNumber from "@/components/InputNumber.vue";
import { eingabeFeld } from "./fields/eingabeFeld";
import { strasseFeld } from "./fields/strasseFeld";
import { hausnummerFeld } from "./fields/hausnummerFeld";
import { ortFeld } from "./fields/ortFeld";

const allFields: Ref<{ id: string; value: string; hasError: boolean }[]> = ref(
  []
);

/*
  Needed inputs for fields
*/

const eingabe = reactive({ id: "eingabe", value: "Stefan", hasError: false });
allFields.value.push(eingabe);
const eingabeIsCorrect = computed(() => {
  return eingabe.value !== "" && !eingabe.hasError;
});
watch(
  () => eingabe.value,
  () => setBtnDisabled()
);

const strasse = reactive({
  id: "strasse",
  value: "Musterstr.",
  hasError: false,
});
allFields.value.push(strasse);
watch(
  () => strasse.value,
  () => setBtnDisabled()
);

const hausnummer = reactive({
  id: "hausnummer",
  value: "235",
  hasError: false,
});
allFields.value.push(hausnummer);
watch(
  () => hausnummer.value,
  () => setBtnDisabled()
);

const ort = reactive({ id: "ort", value: "", hasError: false });
allFields.value.push(ort);

/*
  Submit Button
*/

const btnDisabled = ref(true);
const formHadChanges = ref(false);
const isSubmitting = ref(false);

const disableButton = computed(() => {
  return btnDisabled.value || !formHadChanges.value || isSubmitting.value;
});

const setBtnDisabled = () => {
  formHadChanges.value = true;

  let fieldHasError = false;
  for (const field of allFields.value) {
    if (field.hasError) {
      fieldHasError = true;
      break;
    }
  }

  btnDisabled.value = fieldHasError;
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  isSubmitting.value = true;
  let res = "";
  for (const field of allFields.value) {
    res += `${field.id}: ${field.value}\n`;
  }
  alert(res);
  isSubmitting.value = false;
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin-bottom: 1rem;
}
</style>
