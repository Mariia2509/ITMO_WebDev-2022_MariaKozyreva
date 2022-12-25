<script setup lang="ts">
import { inject, ref, computed, onMounted } from 'vue';

const LIMIT = 10;

const domInputFile = ref(null);
const db:any = inject('db');
const booksList = ref([]);
const currentPageIndex = ref(0);
const maxBooks = ref(0);
const isLoading = ref(true);
const canRenderUpload = computed(() => !isLoading && (booksList.value as Array<any>).length === 0)
const canRenderNextPageButton = computed(() => currentPageIndex.value < Math.floor((maxBooks.value - 1) / LIMIT))
const loadBooks = async () => await db.allDocs({ limit: LIMIT, skip: currentPageIndex.value * LIMIT, include_docs: true }).then((result: any) => {
  booksList.value = result.rows;
  isLoading.value = false;
  maxBooks.value = result.total_rows;
  console.log(result);
})

const onPageNextClick = () => {
  currentPageIndex.value++;
  loadBooks();
}

const onPagePrevClick = () => {
  currentPageIndex.value--;
  loadBooks();
}

const onUploadClick = () => {
  console.log('> onUploadClick');
  const input = (domInputFile.value! as HTMLInputElement);
  input.onchange = () => {
    const fileList = input.files as FileList;
    const selectedFile = fileList[0];
    console.log('selectedFile:', selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      const books = JSON.parse(reader.result! as string);
      console.log('selectedFile:', books);
      db.bulkDocs(books);
      reader.onload = null;
    };
    reader.readAsText(selectedFile);
    input.onchange = null;
  }
  input.click();
}

onMounted(() => {
  loadBooks();
})
</script>

<template>
  <div v-if="canRenderUpload">
    <input hidden ref="domInputFile" type="file" />
    <button @click="onUploadClick">Upload</button>
  </div>
  <div v-else-if="isLoading">
    Loading...
  </div>
  <div v-else>
    Books, page <span>{{ currentPageIndex + 1 }}</span>
    <div>
      <button v-if="currentPageIndex > 0" @click="onPagePrevClick">Prev</button>
      <button v-if="canRenderNextPageButton" @click="onPageNextClick">Next</button>
    </div>
    <div style="text-align: left;">
      <div v-for="book in booksList">{{ book.doc.title }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>
