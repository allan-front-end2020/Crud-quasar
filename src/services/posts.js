import useApi from 'src/composables/UseApi'

export default function postServices () {
  const { list, post, update, remove } = useApi('posts')

  return {
    list,
    post,
    update,
    remove
  }
}
