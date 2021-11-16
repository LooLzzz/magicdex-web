import { login, register } from "./auth"
import {
  getAllCards,
  deleteAllCards,
  getCards,
  updateCards,
  deleteCards,
  getCardById,
  updateCardById,
  deleteCardById,
} from "./collection"


const MagicdexApi = {
  login,
  register,
  getCards,
  updateCards,
  deleteCards,
  getAllCards,
  deleteAllCards,
  getCardById,
  updateCardById,
  deleteCardById,
}

export default MagicdexApi