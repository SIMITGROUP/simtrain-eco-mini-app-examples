<template>
  <div class="px-8 py-7 space-y-6">
    <Toast />

    <Button icon="pi pi-arrow-left" @click="visible = true" />
    <div class="space-y-2">
      <div class="font-semibold text-xl"># Action</div>
      <div class="font-semibold">## Navigate</div>
      <div class="space-x-2">
        <Button @click="navigateToStudents" label="Navigate To Student" />
        <Button @click="navigateToReligions" label="Navigate To Religions" />
        <Button
          @click="navigateToReligion"
          label="Navigate To Religion Detail"
        />
        <Button
          @click="navigateToWithinMiniApp"
          label="Navigate Within Mini App"
        />
      </div>

      <div class="font-semibold">## On Screen Add New</div>
      <div class="space-x-2">
        <Button @click="openNewReligionForm" label="Create Student" />
        <Button @click="openEditReligionForm" label="Edit Student" />
      </div>

      <div class="font-semibold">## API</div>
      <div class="space-x-2">
        <Button @click="getStudents" label="Get Students" />

        <Button @click="getStudent" label="Get Student" />

        <Button @click="createStudent" label="Create Student" />

        <Button @click="updateStudent" label="Update Student" />

        <Button @click="deleteStudent" label="Delete Student" />

        <Button @click="getAutoCompleteStudent" label="Student Auto Complete" />

        <Button
          @click="getCurrentOrganization"
          label="Get Current Organization"
        />

        <Button @click="getCurrentBranch" label="Get Current Branch" />
      </div>
    </div>

    <div class="space-y-4">
      <div class="font-semibold text-xl"># Result</div>
      <div>
        <div class="font-semibold">## Students Result:</div>
        <i v-if="isFetchingStudents" class="pi pi-spinner animate-spin" />
        <template v-else>
          <DataTable
            v-if="students"
            :value="students"
            tableStyle="min-width: 50rem"
          >
            <Column field="studentCode" header="Code"></Column>
            <Column field="studentName" header="Name"></Column>
            <Column field="alternateName" header="Alternate Name"></Column>
            <Column field="gender" header="Gender"></Column>
          </DataTable>
        </template>
      </div>

      <Divider />

      <div class="grid grid-cols-5 gap-2 text-xs">
        <div>
          <div class="text-base font-semibold">## Student Result:</div>
          <i v-if="isFetchingStudent" class="pi pi-spinner animate-spin" />
          <div v-else class="overflow-x-auto">
            <pre>{{ student }}</pre>
          </div>
        </div>

        <div>
          <div class="text-base font-semibold">## Created Student Result:</div>
          <i v-if="isCreatingStudent" class="pi pi-spinner animate-spin" />
          <div v-else class="overflow-x-auto">
            <pre>{{ createdStudent }}</pre>
          </div>
        </div>

        <div>
          <div class="text-base font-semibold">## Updated Student Result:</div>
          <i v-if="isUpdatingStudent" class="pi pi-spinner animate-spin" />
          <div v-else class="overflow-x-auto">
            <pre>{{ updatedStudent }}</pre>
          </div>
        </div>

        <div>
          <div class="text-base font-semibold">## Deleted Student Result:</div>
          <i v-if="isDeletingStudent" class="pi pi-spinner animate-spin" />
          <div v-else class="overflow-x-auto">
            <pre>{{ deletedStudent }}</pre>
          </div>
        </div>

        <div>
          <div class="text-base font-semibold">
            ## Student AutoComplete Result:
          </div>
          <i
            v-if="isFetchingStudentAutoComplete"
            class="pi pi-spinner animate-spin"
          />
          <div v-else class="overflow-x-auto">
            <pre>{{ autoCompleteStudent }}</pre>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="grid grid-cols-5 gap-2 text-xs">
        <div>
          <div class="text-base font-semibold">
            ## Current Organization Result:
          </div>
          <i
            v-if="isFetchingCurrentOrganization"
            class="pi pi-spinner animate-spin"
          />
          <div v-else class="overflow-x-auto">
            <pre>{{ currentOrganization }}</pre>
          </div>
        </div>
        <div>
          <div class="text-base font-semibold">## Current Branch Result:</div>
          <i
            v-if="isFetchingCurrentBranch"
            class="pi pi-spinner animate-spin"
          />
          <div v-else class="overflow-x-auto">
            <pre>{{ currentBranch }}</pre>
          </div>
        </div>
      </div>
    </div>

    <Drawer v-model:visible="visible" header="Drawer" position="right">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { SimtrainEcoMiniAppJsSdk } from "@simitgroup/simtrain-eco-mini-app-js-sdk";

// 1️⃣ Create SDK instance
let sdk: SimtrainEcoMiniAppJsSdk | null = null;

if (typeof window !== "undefined") {
  sdk = new SimtrainEcoMiniAppJsSdk();
}

const toast = useToast();
const visible = ref(false);

const isFetchingStudents = ref(false);
const isFetchingStudent = ref(false);
const isCreatingStudent = ref(false);
const isUpdatingStudent = ref(false);
const isDeletingStudent = ref(false);
const isFetchingStudentAutoComplete = ref(false);
const isFetchingCurrentOrganization = ref(false);
const isFetchingCurrentBranch = ref(false);

// 2️⃣ Setup result state
const students = ref<any>(null);
const student = ref<any>(null);
const createdStudent = ref<any>(null);
const updatedStudent = ref<any>(null);
const deletedStudent = ref<any>(null);
const autoCompleteStudent = ref<any>(null);
const currentOrganization = ref<any>(null);
const currentBranch = ref<any>(null);

// 3️⃣ Create handler functions
async function getStudents() {
  if (!sdk) return;
  isFetchingStudents.value = true;
  const result = await sdk.student.list();
  students.value = result;
  isFetchingStudents.value = false;
}

async function getStudent() {
  if (!sdk) return;
  isFetchingStudent.value = true;

  const result = await sdk.student.detail(
    "a2278689-7812-425d-a604-de27322cc2c1"
  );

  student.value = result;
  isFetchingStudent.value = false;
}

async function getAutoCompleteStudent() {
  if (!sdk) return;
  isFetchingStudentAutoComplete.value = true;

  const result = await sdk.student.autoComplete("T", {});

  autoCompleteStudent.value = result;
  isFetchingStudentAutoComplete.value = false;
}

async function createStudent() {
  if (!sdk) return;
  isCreatingStudent.value = true;
  try {
    const result = await sdk.student.create({
      // studentCode: "S25-0001",
      studentName: "Student Create By Plugin",
      alternateName: "MNLT7CM",
      gender: "F",
      email: "",
      mobileNo: "+60123123423423",
      icNumber: "123123897123",
      barcode: "",
      dob: "2025-05-16",
      joinDate: "2025-05-16",
      leaveDate: "",
      status: "active",
      stopDescription: "",
      planReturnDate: "",
      studentGroup: {
        _id: "be8e961d-c5fc-4bd7-aaa1-5e2ee462f27d",
        label: "Group 1",
        code: "GRP-001",
      },
      level: {
        _id: "f81eef10-bbf5-4a9c-9106-1274aa5beb64",
        code: "001",
        label: "Level 1",
      },
      race: {
        _id: "b3967e7a-b80b-4304-a141-760cd8d988ed",
        label: "Chinese",
        code: "CHN",
      },
      religion: {
        _id: "b3dac518-d0c7-44b0-b9d3-5b604c89fbe8",
        label: "Buddhism",
        code: "BUD",
      },
      school: {
        _id: "c957b7fb-3337-4641-b42f-6366aab363b2",
        label: "School 1",
        code: "SCH-001",
      },
      address: {
        _id: "",
        street1: "17 Jalan AAA",
        street2: "Taman AAA",
        postCode: "81100",
        city: "Johor Bahru",
        region: "Johor",
        country: "Malaysia",
      },
      area: {
        _id: "4697493f-e465-468d-8473-587a611b8fd6",
        label: "Area 1",
        code: "AREA-001",
      },
      parents: [],
      docNoFormat: {
        _id: "6349d2e7-b798-46d1-b7bb-407b3df34bcf",
        label: "Default STU - HQ",
        value: {
          _id: "6349d2e7-b798-46d1-b7bb-407b3df34bcf",
          label: "Default STU - HQ",
        },
      },
    });

    createdStudent.value = result;
  } catch (e: any) {
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: e.response.statusText,
      life: 3000,
    });
  }
  isCreatingStudent.value = false;
}

async function deleteStudent() {
  if (!sdk) return;
  isDeletingStudent.value = true;
  const result = await sdk.student.delete(createdStudent.value._id);
  deletedStudent.value = result;
  isDeletingStudent.value = false;
}

async function updateStudent() {
  if (!sdk) return;
  isUpdatingStudent.value = true;

  const result = await sdk.student.patch(createdStudent.value._id, {
    studentName: "[Updated] Student Create By Plugin",
  });

  updatedStudent.value = result;
  isUpdatingStudent.value = false;
}

async function getCurrentOrganization() {
  if (!sdk) return;
  isFetchingCurrentOrganization.value = true;

  const result = await sdk.organization.current();

  currentOrganization.value = result;
  isFetchingCurrentOrganization.value = false;
}

async function getCurrentBranch() {
  if (!sdk) return;
  isFetchingCurrentBranch.value = true;

  const result = await sdk.branch.current();

  currentBranch.value = result;
  isFetchingCurrentBranch.value = false;
}

function navigateToStudents() {
  if (!sdk) return;
  sdk.ui.navigateTo("app-plugins/payroll-panda/app/streamlit-version");
}

function navigateToReligions() {
  if (!sdk) return;
  sdk.ui.navigateTo("religion");
}

function navigateToReligion() {
  if (!sdk) return;
  sdk.ui.navigateTo("religion", "7e9e409c-9670-4149-87fe-c8766ab42d81");
}

function navigateToWithinMiniApp() {
  if (!sdk) return;
  sdk.current.navigateTo("streamlit-version");
}

function openNewReligionForm() {
  if (!sdk) return;
  sdk.student.openOnScreenForm();
}

function openEditReligionForm() {
  if (!sdk) return;
  sdk.student.openOnScreenForm("a2278689-7812-425d-a604-de27322cc2c1");
}
</script>
