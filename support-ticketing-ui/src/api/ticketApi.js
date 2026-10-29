import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tickets';

export const fetchTickets = async (filter = 'ALL') => {
  const response = await axios.get(API_BASE_URL, { params: { filter } });
  return response.data;
};

export const fetchTicketById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const addComment = async (ticketId, commentPayload) => {
  const response = await axios.post(`${API_BASE_URL}/${ticketId}/comments`, commentPayload);
  return response.data;
};