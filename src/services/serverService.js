import { delay } from '@/model/utils/generalUtils.js';

const CONST_WELCOME = 'Welcome';

class ServerService {
  constructor(url) {
    this.url = url;
  }

  async requestTodos() {
    console.log(`>ServerService -> requestTodos`);
    const data = await fetch(`${this.url}/todos`, {
      method: 'GET',
    })
      .then((response) => {
        return response.ok ? response.json() : new Error('');
      })
      .catch((e) => {
        return [];
      });

    await delay(3000);
    return data;
  }
}

export default ServerService;
