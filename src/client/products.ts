import axios from 'axios'

export const baseURL = 'https://63c10327716562671870f959.mockapi.io/products'

export const client = axios.create({
  baseURL,
})
