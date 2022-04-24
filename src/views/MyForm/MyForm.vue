<template>
  <form>
    <InputText
      v-bind="eingabeFeld"
      v-model:model-value="eingabe.name"
      v-model:has-error="eingabe.hasError"
    />
    <InputText
      v-bind="strasseFeld"
      v-model:model-value="strasse.name"
      v-model:has-error="strasse.hasError"
    />
    <InputNumber
      v-bind="hausnummerFeld"
      v-model:model-value="hausnummer.name"
      v-model:has-error="hausnummer.hasError"
    />
    <InputText
      v-bind="ortFeld"
      v-model:model-value="ort.name"
      v-model:has-error="ort.hasError"
    />
    <p>{{ eingabe.name }} - {{ eingabe.hasError }} - {{ eingabeIsCorrect }}</p>
    <p>{{ strasse.name }} - {{ strasse.hasError }}</p>
    <p>{{ hausnummer.name }} - {{ hausnummer.hasError }}</p>
    <p>{{ ort.name }} - {{ ort.hasError }}</p>
    <div>
      <button type="submit" :disabled="disableButton">Speichern</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from "vue";
import InputText from "@/components/InputText.vue";
import InputNumber from "@/components/InputNumber.vue";
import { eingabeFeld } from "./fields/eingabeFeld";
import { strasseFeld } from "./fields/strasseFeld";
import { hausnummerFeld } from "./fields/hausnummerFeld";
import { ortFeld } from "./fields/ortFeld";

/*
  Needed inputs for fields
*/
const eingabe = reactive({ name: "Stefan", hasError: false });
const eingabeIsCorrect = computed(() => {
  return eingabe.name !== "" && !eingabe.hasError;
});
watch(
  () => eingabe.name,
  () => setBtnDisabled()
);

const strasse = reactive({ name: "Musterstr.", hasError: false });
watch(
  () => strasse.name,
  () => setBtnDisabled()
);

const hausnummer = reactive({ name: "235", hasError: false });
watch(
  () => hausnummer.name,
  () => setBtnDisabled()
);

const ort = reactive({ name: "", hasError: false });

/*
  Submit Button
*/
const btnDisabled = ref(true);
const formHadChanges = ref(false);

const disableButton = computed(() => {
  return btnDisabled.value || !formHadChanges.value;
});

const setBtnDisabled = () => {
  formHadChanges.value = true;
  if (eingabe.hasError || strasse.hasError || hausnummer.hasError) {
    btnDisabled.value = true;
  } else {
    btnDisabled.value = false;
  }
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
