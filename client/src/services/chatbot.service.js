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
      if (res.status === 201) {
        return true;
      }
      return res.json();
    } catch (e) {
      return e.message;
    }
  }
}

export default new ChatbotService();
