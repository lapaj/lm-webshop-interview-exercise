import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import useProducts from '../useProducts'
import type { Product } from '@/types'
import { client } from '@/client/products'

describe('products composable store', () => {
  const { products } = useProducts()

  const mockResponse: Product[] = [
    {
      id: '1',
      name: 'paper',
      img: '/paper.jpg',
      availableAmount: 1,
      minOrderAmount: 1,
      price: 1.0,
    },
  ]

  beforeEach(() => {
    products.splice(0)
  })

  it('initializes the products', () => {
    expect(products).toBeDefined()
    expect(products.length).toBe(0)
  })

  it('fetches the products', async () => {
    const { fetchProducts } = useProducts()

    vi.spyOn(client, 'get').mockResolvedValue({
      status: 200,
      data: mockResponse,
    })

    fetchProducts()
    await flushPromises()

    expect(client.get).toHaveBeenCalledWith('/')
    expect(products).toEqual(mockResponse)
  })

  it('gets product by id', () => {
    const { products, getProductById } = useProducts()

    Object.assign(products, mockResponse)

    const result = getProductById('1')
    expect(result).toStrictEqual(mockResponse[0])
  })

  it('adds product', () => {
    const { addProduct } = useProducts()

    addProduct(mockResponse[0])
    expect(products[0]).toStrictEqual(mockResponse[0])
  })
})
