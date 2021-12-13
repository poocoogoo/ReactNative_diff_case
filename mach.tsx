import {Response} from './types';
import './index.css'

interface Props {
	api: Response
}

class MachCustomView extends Component<Props> {
	props: any
	
	botttomBtnClick() {
		const {schema_url} = this.props.api;
		const param = {
			schema: schema_url
		};
		/// 第三种：Native通信的桥
		MachNative.sendEvent('jumpToDetail', JSON.stringify(param));
	}
	
	render() {
		const {api} = this.props;
		/// 第一种：使用变量
		const isAndroid = this.props.env.osName === 'android'
		const isIOS = this.props.env.osName === 'ios'
		const schemaUrl = api.schema_url + "&from=details"
		return (
			<View className="out-container" style={{ borderRadius: '12dp'}}>
				<View className="container" style={{ borderRadius: '12dp'}}>
					<Text className="page-title" content={api.page_title}/>
					<Richtext className="page-sub-title" content={api.page_sub_title}/>
					{
						isAndroid &&
                        <Text className="commit-btn" content={'hello'}
                               click={schemaUrl}/>
					}
					{
						isIOS &&
                        <Text className="commit-btn" content={commitTextContent}
                              onClick={this.botttomBtnClick(schemaUrl)}/>
					}
				</View>
				{/* 第二种：直接使用 */}
				<Image className={"mt-ship-time-explain-icon"}
				       src={"assets://images/wm_mt_explain_alert_ic.png"}
				       style={{"margin-top" : (this.env.osName === 'ios' ? "1dp" : "4dp")}}
				      />}
				{api.address_info.address && this.env.osName === 'ios' && (
					<order-rich-text className="address-text"
					                    icon-height='18dp'>
				)}
			</View>
		);
	}
}
