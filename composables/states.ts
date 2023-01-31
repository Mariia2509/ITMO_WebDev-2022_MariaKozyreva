const getStateOrFetchWhenAbsent = (key: string, path: string): any => {
  const state = useState(key);
  if (!state.value) {
    const setting = useRuntimeConfig();
    state.value = useFetch(`${setting.DATA_API}${path}`);
  }
  return state.value;
}

export const useUser = () => ({
  getUser: (): any => {
    return getStateOrFetchWhenAbsent('user', '/users/1');
  }
});

export const useBooks = () => ({
  getAll: (): any => {
    return getStateOrFetchWhenAbsent('books', '/comments');
  }
});