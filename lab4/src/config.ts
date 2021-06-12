export const firebaseConfig = {
	apiKey: 'AIzaSyAnZkDXXG_ZjjjmxmQd6m53BZp6YDCrv7M',
	authDomain: 'wsei-5be3e.firebaseapp.com',
	projectId: 'wsei-5be3e',
	storageBucket: 'wsei-5be3e.appspot.com',
	messagingSenderId: '324561629492',
	appId: '1:324561629492:web:7887f48fbcaaf4ff733561',
	measurementId: 'G-H77E989H0R'
};

export enum StoreType {
	firebase,
	localStorage
}

export const storeType: StoreType = StoreType.firebase;
