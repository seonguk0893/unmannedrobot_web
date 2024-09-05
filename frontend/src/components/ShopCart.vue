<template>
  <div>
    <h3 class="title">장바구니</h3>
    <div v-show="!products.length">
      <p>장바구니에 추가된 상품이 없습니다!</p>
      <router-link to="/">쇼핑 계속하기</router-link>
    </div>

    <div v-show="products.length">
      <div class="cart_list">
        <div v-for="p in products" :key="p.id">
          <div class="cart_item">
            <span>{{ p.name }}</span>
            <span>수량 : {{ p.quantity }}</span>
            <span
              >{{
                new Intl.NumberFormat("ko-KR").format(
                  Number(p.price.replace(/,/g, "")) * p.quantity
                )
              }}
              원</span
            >
            <div>
              <button
                type="button"
                class="button item_button cart_button"
                @click="addToCart(p)"
              >
                +
              </button>
              <button
                type="button"
                class="button item_button remove_button"
                @click="removeFromCart(p)"
              >
                &minus;
              </button>
            </div>
          </div>
        </div>
      </div>
      <span class="total">총 가격 : {{ total }} 원</span>
    </div>

    <button v-show="products.length" @click="showModal" class="checkout">
      결제하기
    </button>

    <div v-if="isModalVisible" class="modal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <p class="modal-text">결제할 사용자의 이름을 입력하세요</p>
        <input
          type="text"
          v-model="inputName"
          @keyup.enter="confirmCheckout"
          class="modal-input"
        />
        <button @click="confirmCheckout" class="modal-button">확인</button>
      </div>
    </div>

    <div v-if="isSurveyVisible" class="survey-modal">
      <div class="survey-modal-content">
        <p class="survey-text">만족도 설문조사</p>

        <p class="survey-modal-text">성별을 선택하세요.</p>
        <div class="gender-selection">
          <span
            class="gender-option"
            :class="{ selected: gender === '남' }"
            @click="gender = '남'"
          >
            남
          </span>
          <span
            class="gender-option"
            :class="{ selected: gender === '여' }"
            @click="gender = '여'"
          >
            여
          </span>
        </div>

        <p class="survey-modal-text">연령대를 선택하세요.</p>
        <div class="age-selection">
          <span
            class="age-option"
            :class="{ selected: ageGroup === '10대' }"
            @click="ageGroup = '10대'"
          >
            10대
          </span>
          <span
            class="age-option"
            :class="{ selected: ageGroup === '20대' }"
            @click="ageGroup = '20대'"
          >
            20대
          </span>
          <span
            class="age-option"
            :class="{ selected: ageGroup === '30대' }"
            @click="ageGroup = '30대'"
          >
            30대
          </span>
          <span
            class="age-option"
            :class="{ selected: ageGroup === '40대' }"
            @click="ageGroup = '40대'"
          >
            40대
          </span>
          <span
            class="age-option"
            :class="{ selected: ageGroup === '50대' }"
            @click="ageGroup = '50대'"
          >
            50대
          </span>
          <span
            class="age-option"
            :class="{ selected: ageGroup === '60대 이상' }"
            @click="ageGroup = '60대 이상'"
          >
            60대 이상
          </span>
        </div>

        <p class="survey-modal-text">1. 무인 의류매장 이용 시 편리함을 느끼셨나요?</p>
        <div class="rating">
          <button
            v-for="n in 5"
            :key="'convenience' + n"
            @click="setRating('convenience', n)"
            :class="{ selected: convenienceRating === n }"
          >
            {{ n }}
          </button>
        </div>

        <p class="survey-modal-text">2. 무인 의류매장 시스템에 대해 만족하시나요?</p>
        <div class="rating">
          <button
            v-for="n in 5"
            :key="'satisfaction' + n"
            @click="setRating('satisfaction', n)"
            :class="{ selected: satisfactionRating === n }"
          >
            {{ n }}
          </button>
        </div>

        <p class="survey-modal-text">3. 무인 의류매장을 다시 이용하실 의향이 있으신가요?</p>
        <div class="rating">
          <button
            v-for="n in 5"
            :key="'intention' + n"
            @click="setRating('intention', n)"
            :class="{ selected: intentionRating === n }"
          >
            {{ n }}
          </button>
        </div>
        <button @click="submitSurvey" class="survey-modal-button">제출</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "ShopCart",

  data() {
    return {
      isModalVisible: false,
      isSurveyVisible: false,
      inputName: "",
      convenienceRating: 0,
      satisfactionRating: 0,
      intentionRating: 0,
      gender: "",
      ageGroup: "",
    };
  },

  computed: {
    ...mapGetters({
      products: "cartProducts",
      total: "total",
    }),
    ...mapState(["people", "selectedPerson"]),
  },

  methods: {
    ...mapMutations([
      "addToCart",
      "removeFromCart",
      "SelectedPerson",
      "clearCart",
      "addUserToUserlist",
    ]),

    showModal() {
      this.isModalVisible = true;
      this.isSurveyVisible = false;
    },

    closeModal() {
      this.isModalVisible = false;
      this.inputName = "";
    },

    showSurvey() {
      this.isSurveyVisible = true;
      this.isModalVisible = false;
    },

    closeSurvey() {
      this.isSurveyVisible = false;
      this.convenienceRating = 0;
      this.satisfactionRating = 0;
      this.intentionRating = 0;
      this.gender = "";
      this.ageGroup = "";
    },

    setRating(type, rating) {
      if (type === "convenience") {
        this.convenienceRating = rating;
      } else if (type === "satisfaction") {
        this.satisfactionRating = rating;
      } else if (type === "intention") {
        this.intentionRating = rating;
      }
    },

    async confirmCheckout() {
      if (!this.inputName) {
        alert("사용자 이름을 입력하세요.");
        return;
      }

      this.$store.commit("SelectedPerson", { name: this.inputName });

      if (confirm(`${this.inputName}님이 결제하실 금액은 총 ${this.total} 원 입니다.\nPOS기기에서 결제해주세요.`)) {
        try {
          const numericTotal = Number(this.total.replace(/,/g, ''));

          await axios.post('http://3.34.208.234:8080/api/shop/user', {
            username: this.inputName,
            price: numericTotal       
          });

          this.$store.commit("clearCart");

          this.surveyUsername = this.inputName;

          this.closeModal();
          this.showSurvey();

        } catch (error) {
          console.error("Error during checkout:", error);
          alert("결제 처리 중 오류가 발생했습니다.");
        }
      }
    },

    async submitSurvey() {
      if (!this.convenienceRating || !this.satisfactionRating || !this.intentionRating || !this.gender || !this.ageGroup) {
        alert("모든 설문 항목을 완료해주세요.");
        return;
      }

      try {
        // 요청과 응답을 콘솔에 로그로 출력하여 디버깅
        console.log("Submitting survey with data:", {
          username: this.surveyUsername,
          convenience: this.convenienceRating,
          satisfaction: this.satisfactionRating,
          intention: this.intentionRating,
          gender: this.gender,
          ages: this.ageGroup
        });

        const response = await axios.post('http://3.34.208.234:8080/api/shop/survey', {
          username: this.surveyUsername,
          convenience: this.convenienceRating,
          satisfaction: this.satisfactionRating,
          intention: this.intentionRating,
          gender: this.gender,
          ages: this.ageGroup
        });

        console.log("Survey response:", response);

        alert("만족도 조사가 제출되었습니다. 감사합니다!");
        this.closeSurvey();
      } catch (error) {
        console.error("Error submitting survey:", error);

        // 에러 메시지를 구체적으로 확인
        if (error.response) {
          // 서버가 응답을 반환했으나 상태 코드가 2xx가 아닌 경우
          console.error("Response error data:", error.response.data);
          console.error("Response error status:", error.response.status);
          console.error("Response error headers:", error.response.headers);
        } else if (error.request) {
          // 요청은 성공적으로 보냈으나 응답이 없는 경우
          console.error("Request error data:", error.request);
        } else {
          // 오류를 발생시킨 요청을 설정할 때 발생한 오류
          console.error("Error message:", error.message);
        }

        alert("만족도 조사 제출 중 오류가 발생했습니다.");
      }
    }

  },
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
  font-size: 30px;
}

.cart_list {
  margin-bottom: 20px;
}
.cart_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid gray;
}
.cart_item > span {
  width: 300px;
}
.button {
  background: #fff;
  border: 1px solid #35a2c7;
  border-radius: 4px;
}
.button:hover {
  background: #35a2c7;
  color: #fff;
  border: none;
  cursor: pointer;
}
.item_button {
  margin-right: 10px;
}
.cart_button,
.remove_button {
  width: 30px;
  height: 30px;
}
.checkout {
  margin-top: 30px;
  padding: 10px;
  border-radius: 4px;

  background: #35a2c7;
  color: #fff;
  border: none;
  cursor: pointer;
}
.total {
  font-weight: bold;
}

/* 모달 스타일 */
.modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #008cba;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.modal-input {
  display: block;
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-button {
  display: block;
  width: 25%;
  margin: 10px auto;
  padding: 10px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
}

.modal-button:hover {
  background-color: #3c3c3c;
}

.modal-text {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #ffffff;
}

.close {
  color: #ffffff;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.survey-modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.survey-modal-content {
  background-color: #008cba;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.survey-modal-button {
  display: block;
  width: 25%;
  margin: 10px auto;
  padding: 10px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
}

.survey-modal-button:hover {
  background-color: #c3c3c3;
}

.survey-modal-text {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #ffffff;
}

.survey-text {
  text-align: center;
  margin-bottom: 15px;
  font-size: 24px;
  color: #ffffff;
}

.rating {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 10px 0;
}

.rating button {
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.rating button.selected {
  background-color: #000000;
  color: #fff;
}

.gender-selection,
.age-selection {
  display: flex;
  justify-content: center;
  gap: 10px; 
  margin-bottom: 10px;
}

.gender-option,
.age-option {
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  transition: background-color 0.3s, color 0.3s;
}

.gender-option:hover,
.age-option:hover {
  background-color: #ffffff;
}

.gender-option.selected,
.age-option.selected {
  background-color: #000000;
  color: #fff;
}
</style>
