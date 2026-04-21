export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: 'hot' | 'cold' | 'shakes' | 'specials'
  image: string
  tags: string[]
  popular?: boolean
  calories?: number
}

export interface CartItem extends MenuItem {
  quantity: number
  customizations?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  createdAt: Date
  deliveryAddress?: string
  paymentIntentId?: string
  customerName: string
  customerEmail: string
}

export interface UserProfile {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  createdAt: Date
}
