// 리덕스에서 알아야 할 키워드
// 1. 액션(Action)
//  - 상태에 변화가 필요할 때 발생시킴(객체하나에 표현)
//    type을 필수로, 그 외의 값들은 개발자 마음대로 생성
// 2. 액션 생성함수(Action Creator)
//  - 컴포넌트에서 더욱 쉽게 액션을 발생시키기 위함. 필수아님
// 3. 리듀서(Reducer)
//  - 변화를 일으키는 함수
//    현재의 상태와 액션을 참조하여 새로운 상태를 반환
// 4. 스토어(Store)
//  - 한 애플리케이션당 하나의 스토어
//    현재의 앱 상태와, 리듀서, 내장함수 포함
// 5. 디스패치(dispatch)
//  - 스토어의 내장함수. 액션을 발생 시키는 것
// 6. 구독(subscribe)
//  - 스토어의 내장함수.
//    subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 될 때마다 전달해준 함수가 호출
//    (react에서는 connect 함수 또는 useSelector Hook을 사용)

// 리덕스의 규칙 3가지
// 1. 하나의 애플리케이션에 하나의 store
// 2. state상태는 읽기 전용
//   - 배열이나 객체 형태로 이루어진 state라면, 기존 상태 자체에 업데이트를 하지 않는다.
//   - 객체의 경우 spread 연산자를 활용하여 새로운 객체를 만들어 업데이트 진행.
//   - 배열의 경우 배열자체에 push를 직접하면서 업데이트 하지 않고 concat등의 함수를 활용하여
//     기존 배열을 수정하지 않고 새로운 배열을 만들어 변경하는 방식으로 업데이트.
// 3. reducer 함수는 순수한 함수여야 한다.
//   - reducer 함수는 이전 state와 action 객체를 파리미터로 받는다.
//   - 이전의 state는 건들이지 않고, 변화를 일으킨 새로운 state 객체를 만들어서 반환.
//   - 똑같은 파라미터로 호출된 reducer 함수는 언제나 똑같은 결과값을 반환.

// 실행할 때마다 결과값이 달라지는 함수 4가지 - reducer 함수 밖에서 처리해줘야함(리덕스 미들웨어를 사용하고는 한다.)
// new Date()
// Math.random()
// axios.get()
// reducer함수 밖의 변수



import React from "react";
import { createStore } from "redux";
// createStore는 스토어를 만들어주는 함수
// 리액트 프로젝트에서는 단 하나의 스토어를 생성한다.
// createStore = configureStore

// 초기화 세팅
// 리덕스에서 관리 할 상태 정의
const initialState = {
    counter: 0,
    text: "",
    list: []
};

// 액션타입 정의, 주로 대문자로 작성
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성함수 정의, 주로 camelCase로 작성
function increase(){
    return{
        type: INCREASE // 액션 객체에는 type 값이 필수
    };
}

const decrease = () => ({
    type: DECREASE
});

const changeText = text => ({
    type: CHANGE_TEXT,
    text // 액션 안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있다.
});

const addToList = item => ({
    type: ADD_TO_LIST,
    item
});

// 리듀서 만들기
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 생성
// 리듀서에서는 불변성을 꼭 지켜줘야함

function reducer(state = initialState, action){
    switch(action.type){
        case INCREASE:
            return{
                ...state,
                counter: state.counter + 1
            };
        case DECREASE:
            return{
                ...state,
                counter: state.counter - 1
            };
        case CHANGE_TEXT:
            return{
                ...state,
                text: action.text
            };
        case ADD_TO_LIST:
            return{
                ...state,
                list: state.list.concat(action.item)
            };
        default:
            return state;
    }
}

// 스토어 만들기
const store = createStore(reducer);
console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회

// 스토어 안에 들어있는 상태가 바뀔 때마다 호출되는 listener 함수
const listener = () => {
    const state = store.getState();
    console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe()를 호출하면 된다.

// 액션을 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("4월입니다."));
store.dispatch(addToList({id: 1, text: "First"}));

window.store = store;
// window.unsubscribe = unsubscribe;