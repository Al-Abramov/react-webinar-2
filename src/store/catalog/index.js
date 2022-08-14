import { getInfoById } from "../../service";
import counter from "../../utils/counter";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      productInfo: {
        _id: '',
        description: '',
        edition: '',
        category: {title: ''},
        maidIn: {
          title: '',
          code: '',
        },
        price: '',
      }
    };
  }

  async load(){
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.store.getState().catalog,
      items: json.result.items
    });
  }

  async getInfo(id) {
    const data = await getInfoById(id);
    this.setState({
      ...this.store.getState().catalog,
      productInfo: data
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      items: this.getState().items.concat({_id, title, price, selected})
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }
}

export default CatalogState;