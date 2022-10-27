<template>
  <q-page padding>
    <q-table
      title="Usuarios"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top>
       <span class="text-h4">Usúarios</span>
      <q-space />
      <q-btn color="primary"  label="Novo usuario" :to="{ name: 'formPost' }" />
    </template>
     <template v-slot:body-cell-actions="props">
      <q-td :props='props' class="q-gutter-sm">
        <q-btn icon='edit'  color='info' dense @click="handleEditPost(props.row.id)"/>
        <q-btn icon='delete'  color='negative' dense @click="handleDeletePost(props.row.id)"/>
      </q-td>
    </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postsService()
    const columns = [

      { name: 'id', field: 'id', label: 'Id', sortable: true, aling: 'left' },
      { name: 'title', field: 'title', label: 'Titulo', sortable: true },
      { name: 'author', field: 'author', label: 'Autor', sortable: true },
      { name: 'actions', field: 'actions', label: 'Ações', aling: 'rigth' }

    ]
    const $q = useQuasar()
    const router = useRouter()
    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const { data } = await list()
        posts.value = data
      } catch (error) {
        console.error(error)
      }
    }
    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Remover',
          message: 'Deseja remover esse usuario?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive ' })
          await getPosts()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao apagar', icon: 'check', color: 'positive ' })
      }
    }
    const handleEditPost = (id) => {
      router.push({ name: 'formPost', params: { id } })
    }

    return {
      posts,
      columns,
      handleDeletePost,
      handleEditPost
    }
  }
})
</script>
