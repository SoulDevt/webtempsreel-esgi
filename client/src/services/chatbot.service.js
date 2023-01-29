import { serverUrl } from '../enums';

class ChatbotService {
  async getEvents() {
    try {
      const res = await fetch(`${serverUrl}/chatbot/events`, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      return res.json();
    } catch (e) {
      return e.message;
    }
  }
  async postEvent(event) {
    try {
      const res = await fetch(`${serverUrl}/chatbot/event`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      if (res.status !== 201) {
        if (res.status == 500) {
          throw new Error('An error occurred, please try again later');
        } else {
          const { message } = await res.json();
          throw new Error(message);
        }
      }
      return 'success';
    } catch (e) {
      return e.message;
    }
  }
}

export default new ChatbotService();
