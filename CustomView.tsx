import {
	NativeModules, Image, ImageStyle, PixelRatio, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback, Button,
} from 'react-native'
import { Env } from '@helloworld/rn-common'
import WMEnv from '@helloworld/wmrn-common/src/utils/env';
import hello from '@helloworld/wmrn-common/src/utils/hello';
import world from '@helloworld/wmrn-common/src/utils/hello';


import { kFavoriteURL, getAppType } from "./Constants";

/// 是否为iOS
const isIOS = Env.isIOS()

const RNCustomeRecommendModule = NativeModules.RNCustomeRecommendBridge

const styles = StyleSheet.create({
	image: {
		width: 25,
		height: 18,
	},
	backgroundContainer: {
		position: 'absolute',
		height: 25,
		left: 0,
		right: 0,
		flexDirection: 'row',
	},
	labelBackground: {
		flexGrow: 1,
		flexShrink: 1,
	},
});

export default class CustomView extends React.PureComponent<Props> {
	componentDidMount() {
		/// ...
	}
	
	render() {
		const label_word = 'world';
		const view_keyword = 'keyword';
		///  第1种：差异代码块....begin , 使用isIOS 变量引用
		let favoriteImageView = null
		if (isIOS) {
			/// 逻辑 1.A
			favoriteImageView = <Image
				style={styles.image as ImageStyle}
				source={{ uri: kFavoriteURL }}  /// 第2种： 从别的模块里包含了多端差异的代码
			/>
		} else {
			/// 逻辑 1.B
			favoriteImageView = <Text> {"hello"}
			</Text>
		}
		/// 差异代码块....end
		
		
		
		/// 第3种：Android 相关的, WMEnv 开头
		let backgroundView = null
		if (WMEnv.isAndroid) {
			/// 逻辑3.A
			backgroundView = (
				<View style={styles.backgroundContainer}>
					<Image
						style={PoiListStyles.labelBackground as ImageStyle}
						source={require('../assets/images/icon_city_deliver_score_bg.png')}
						resizeMode='stretch'/>
					<Image
						source={require('../assets/images/icon_city_deliver_score_bg_tail.png')}/>
				</View>
			)
		} else if (WMEnv.isIOS) {
			/// 逻辑 3.B
			const logText = 'Text';
			console.log(logText);
			backgroundView = (
				<View style={styles.backgroundContainer}>
					<Image
						style={styles.labelBackground as ImageStyle}
						source={require('../assets/images/icon_city_deliver_score_bg_ios.png')}
						capInsets={{top: 0, left: 6, bottom: 0, right: 16}}
						resizeMode='stretch'/>
				</View>
			)
		}
		
		/// 第4种：具体某个业务端不一样
		let scheme = ''
		if (Env.isWM()) {
			scheme = 'kkkkk://ddd.sddd.com/search'
		} else if (Env.isMT()) {
			scheme = 'kkkkk://ddd.sddd.com/mt/search'
		} else if (Env.isDP()) {
			scheme = 'kkkkk://ddd.sddd.com/search/dp/search'
		}
		
		if (scheme.length > 0) {
			/// 逻辑 4.A
		} else {
			/// 逻辑 4.B
		}
		
		
		/// 第5种：端采用变量引用，ifstmt 和 ConditionalExpression
		const isWM = Env.isWM()
		const result = isWM ? 'ddd': 'eeee';
		let ddValue = '';
		if (isWM) {
			ddValue = 'a';
		} else {
			ddValue = 'b';
		}
		if (ddValue === 'c') {
			/// 逻辑 5.A
			const ddFrom = result;
			
		} else {
			/// 逻辑 5.B
			const ddFrom = ddValue + 'DDD';
			/// ....
		}
		
		/// 第6种：在另一个文件里包括了多端不一样的内容
		const appType = getAppType();
		
		if (appType === 10000) {
			//// 逻辑 6.A
		} else {
			/// 逻辑  6.B
		}
		
		
		/// 第7种：在子包里, hello 为TS代码
		const fromCommonValue = hello();
		
		if (fromCommonValue) {
			/// 逻辑 7.A
		} else {
			/// 逻辑 7.B
		}
		
		
		/// 第8种：在NativeModule里
		NativeModules.RNShareModule.showCustomView({
			//...
			/// 8.1 直接调用
		});
		
		const paramsValue = {
			/// ....
		}
		/// 8.2 采用变量调用
		RNCustomeRecommendModule.customRecommendUserSetOptions({params: paramsValue});
		
		
		/// 第9种：子包里有NativeModule，并且是多端差异的代码 world函数就是封装了NativeModule类似上面的代码
		world();
		
		
		
		return (<View>
			{ favoriteImageView }
			
			{/* 差异代码 --------  */}
			{isIOS ? label_word : view_keyword}
			{/* 差异代码 --------  */}
			
		</View>);
	}
	
	
}
