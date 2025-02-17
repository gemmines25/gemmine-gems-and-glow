
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

const supabaseUrl = 'https://YOUR_PROJECT_URL.supabase.co'
const supabaseAnonKey = 'YOUR_ANON_KEY'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const getCartItems = async (userId: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      quantity,
      products (
        id,
        name,
        price,
        images
      )
    `)
    .eq('user_id', userId)

  if (error) throw error
  return data
}

export const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()

  if (existingItem) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)

    if (error) throw error
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id: productId, quantity })

    if (error) throw error
  }
}

export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)

  if (error) throw error
}

export const removeCartItem = async (itemId: string) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)

  if (error) throw error
}
