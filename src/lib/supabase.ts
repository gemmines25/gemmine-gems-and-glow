
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

const supabaseUrl = 'https://oermbvjdjkihizpagobp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lcm1idmpkamtpaGl6cGFnb2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODM3MDEsImV4cCI6MjA1NTM1OTcwMX0.d-Jg55sA8VaPqRTCcmQipAMQLMc5aB-9jejc21WGVBg'

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
