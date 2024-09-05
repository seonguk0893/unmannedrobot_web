<template>
  <div class="user-container">
    <div class="user-list">
      <h2>결제자 리스트</h2>
      <button @click="goToHome" class="home-button">
        <i class="fas fa-home"></i> 홈으로
      </button>      

      <ul v-if="users.length > 0">
        <li v-for="(user, index) in users" :key="index" class="user-item">
          <div class="person-info">
            <span class="user-info">{{ user.username }} - {{ formatPrice(user.price) }} 원</span>
            <div class="button-group">
              <button @click="confirmCheckout(user)" class="checkout-button">결제하기</button>
              <button @click="removePerson(index)" class="delete-button">삭제하기</button>
            </div>            
          </div>
        </li>
      </ul>
      <p v-else>결제할 사용자가 없습니다.</p>
      <button v-if="users.length === 0" @click="refreshPage" class="shopping-button">새로고침</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from 'axios';

export default {
  name: "ShopUser",
  data() {
    return {
      users: [],
      error: false,
      IMPReady: false,
      intervalId: null
    };
  },

  created() {
    this.fetchUsers();
    this.loadIMP();
    this.startPolling();
  },

  methods: {
    ...mapMutations(["SelectedPerson", "removeUserFromUserlist"]),

    async fetchUsers() {
      try {
        const response = await axios.get('http://3.34.208.234:8080/api/shop/user');
        console.log('Fetched users:', response.data);
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        this.error = true;
      }
    },

    startPolling() {
      this.intervalId = setInterval(this.checkForNewUsers, 5000);
    },

    async checkForNewUsers() {
      try {
        const response = await axios.get('http://3.34.208.234:8080/api/shop/user');
        const newUsers = response.data;
        if (newUsers.length !== this.users.length) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error checking for new users:', error);
      }
    },

    loadIMP() {
      const script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
      script.onload = () => {
        this.IMPReady = true;
      };
      document.head.appendChild(script);
    },

    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    confirmCheckout(user) {
      if (!this.IMPReady) {
        alert('결제 모듈을 아직 로드하지 못했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      const IMP = window.IMP;
      IMP.init('imp38377537');

      const priceString = user.price.toString();

      const paymentData = {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `merchant_${new Date().getTime()}`,
        name: `${user.username} 님의 결제`,
        amount: parseInt(priceString.replace(/,/g, ''), 10),
        buyer_name: user.username, 
        buyer_tel: '010-1234-5678',
        buyer_email: 'example@example.com',
      };

      IMP.request_pay(paymentData, async (rsp) => {
        if (rsp.success) {
          try {
            await axios.delete(`http://3.34.208.234:8080/api/shop/user/${user.id}`);
            this.removeUserFromUserlist(user);
            this.users = this.users.filter(u => u.id !== user.id);
            alert(`${user.username}님의 결제가 성공적으로 완료되었습니다.`);
          } catch (error) {
            console.error('Error removing user after payment:', error);
            alert('결제 성공 후 사용자 삭제 중 오류가 발생했습니다.');
          }
        } else {
          alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}.`);
        }
      });
    },

    async removePerson(index) {
      const userToRemove = this.users[index];
      if (confirm(`${userToRemove.username} 님을(를) 삭제하시겠습니까?`)) {
        try {
          await axios.delete(`http://3.34.208.234:8080/api/shop/user/${userToRemove.id}`);
          this.removeUserFromUserlist(userToRemove);
          this.users.splice(index, 1);
        } catch (error) {
          console.error('Error removing user:', error);
          alert('사용자 삭제 중 오류가 발생했습니다.');
        }
      }
    },

    refreshPage() {
      window.location.reload();
    },

    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f7f6;
  color: #333;
}

.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.user-list {
  width: 100%;
  max-width: 1100px;
  background: #008cba;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #ffffff;
}

ul {
  padding: 0;
  list-style: none;
}

.user-item {
  padding: 10px;
  margin: 10px 0;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;
}


.person-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.person-info .user-info {
  font-size: 20px;
  color : #ffffff;
}

.button-group {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 14px;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(1px);
}

.checkout-button {
  background-color: #ffffff;
  color: #000000;
}

.delete-button {
  background-color: #000000;
  color: #fff;
}

.shopping-button, .home-button {
  background-color: #ffffff;
  color: #000000;
}

button i {
  margin-right: 5px;
}
</style>
