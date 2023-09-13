import styles from './CurrentListPage.module.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as listAPI from '../../utilities/list-api'
import Logo from '../../components/Logo/Logo'
import UserLogOut from '../../components/UserLogOut/UserLogOut'

export default function OrderHistoryPage({ user, setUser }) {
  /*--- State --- */
  const [list, setList] = useState({});

  /*--- Side Effects --- */
  useEffect(function () {
    // Load previous orders (paid)
    async function fetchCurrentList() {
      const list = await listAPI.getCurrentList()
      setList(list)
    }
    fetchCurrentList();
  }, []);

  /*--- Event Handlers --- */
  function handleSelectOrder(order) {
    setActiveOrder(order);
  }

  /*--- Rendered UI --- */
  return (
    <main className={styles.OrderHistoryPage}>
      <aside className={styles.aside}>
        <Logo />
        <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <OrderList
        orders={orders}
        activeOrder={activeOrder}
        handleSelectOrder={handleSelectOrder}
      />
      <OrderDetail
        order={activeOrder}
      />
    </main>
  );
}