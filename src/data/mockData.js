import { Heart, Home, Settings } from 'lucide-react'

export const user = {
  name: 'ALVARO VASQUEZ',
  location: 'Av. Universitaria 123, Lima',
}

export const pendingOrder = {
  status: 'Pedido Pendiente',
  label: 'Tu almuerzo está en camino',
  price: 'S/ 24.90',
}

export const universities = [
  'Universidad Nacional de San Agustín (UNSA)',
  'Universidad Católica de Santa María (UCSM)',
  'Universidad Católica San Pablo (UCSP)',
  'Universidad de San Martín de Porres (USMP)',
  'Universidad Tecnológica del Perú (UTP)',
  'Universidad Continental (UC)',
  'Universidad La Salle (ULS)',
  'Universidad Privada de Tacna (UPT)',
]

export const categories = [
  { id: 1, name: 'Bebidas', image: '🥤' },
  { id: 2, name: 'Jugos', image: '🍊' },
  { id: 3, name: 'Sandwiches', image: '🥪' },
  { id: 4, name: 'Refrescos', image: '🧊' },
  { id: 5, name: 'Postres', image: '🍮' },
  { id: 6, name: 'Pasteles', image: '🍰' },
  { id: 7, name: 'Café', image: '☕' },
  { id: 8, name: 'Desayunos', image: '🥐' },
]

export const products = [
  {
    id: 1,
    name: 'Combo universitario',
    description: 'Sandwich, jugo natural y postre',
    price: 'S/ 18.50',
    image: '🥪',
    entrepreneur: 'Sabor Campus',
  },
  {
    id: 2,
    name: 'Café + pastel',
    description: 'Café americano con pastel del día',
    price: 'S/ 12.90',
    image: '☕',
    entrepreneur: 'Dulce Aula',
  },
]

export const currentPurchase = {
  id: 'P-001',
  productName: 'Combo universitario',
  purchaseDate: '02/05/2026',
  status: 'Pago pendiente',
  amount: 'S/ 18.50',
}

export const purchaseHistory = [
  {
    id: 'P-0003',
    productName: 'Café + pastel',
    purchaseDate: '30/04/2026',
    status: 'Entregado',
    amount: 'S/ 12.90',
  },
  {
    id: 'P-0002',
    productName: 'Jugo natural',
    purchaseDate: '28/04/2026',
    status: 'Entregado',
    amount: 'S/ 6.00',
  },
  {
    id: 'P-0001',
    productName: 'Sandwich mixto',
    purchaseDate: '25/04/2026',
    status: 'Cancelado',
    amount: 'S/ 9.50',
  },
]

export const missions = [
  {
    id: 'M-001',
    title: 'Compra 3 productos',
    description: 'Compra 3 productos dentro de Emprende U y recibe una oferta del 10%.',
    progress: 2,
    goal: 3,
    reward: '10% de descuento',
    code: 'EMPRENDE10',
  },
  {
    id: 'M-002',
    title: 'Prueba un desayuno',
    description: 'Compra un desayuno universitario y desbloquea una oferta especial.',
    progress: 0,
    goal: 1,
    reward: 'S/ 3.00 de descuento',
    code: 'DESAYUNO3',
  },
]

export const navItems = [
  { id: 'home', label: 'Inicio', icon: Home, active: true },
  { id: 'favorites', label: 'Favoritos', icon: Heart },
  { id: 'options', label: 'Opciones', icon: Settings },
]
