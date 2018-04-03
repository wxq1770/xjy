import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Accordion, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../../libs/toJS';
import {
  orderList,
  getPayParamer,
} from './actions';
import './index.less';

class Help extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      cur : 1,
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }
  renderContent = page => {
    this.props.router.push(page);
  }
  num = (num) =>{
    this.setState({
      cur : num
    });
  }
  render() {
    const { cur } = this.state;
    return (
      <div className="user-help">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
          帮助中心
        </NavBar>
        <div className="user-help-tab">
          <div className={"user-help-tab-content overflow-scrolling cur-num-"+cur}>
            <span className={"cur cur-1"} onClick={this.num.bind(this,1)}>购买绑定</span>
            <span className={"cur cur-2"} onClick={this.num.bind(this,2)}>样本采集</span>
            <span className={"cur cur-3"} onClick={this.num.bind(this,3)}>检测报告</span>
            <span className={"cur cur-4"} onClick={this.num.bind(this,4)}>名词解释</span>
            <span className={"cur cur-5"} onClick={this.num.bind(this,5)}>基因知识</span>
            <span className={"cur cur-6"} onClick={this.num.bind(this,6)}>隐私保护</span>
          </div>
        </div>
        <div className={"list-show-"+cur}>
          <div className="user-help-list list_1">
            <Accordion accordion className="user-help-list-item" onChange={this.onChange}>
              <Accordion.Panel header="想一次性买几个小基因产品送朋友可以么？">
                <div className="user-help-list-content">
                  非常欢迎！小基因支持一个账号为多人购买产品：）<br/>
                  温馨提示：为亲友购买时请务必为他们备注昵称，以便区分他们的检测密码。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="帮亲友购买后，怎么把检测密码给他？">
                <div className="user-help-list-content">
                  检测密码可在【我的订单】-【订单详情】查看，也能在微信通知、短信通知中找到，您可根据为亲友备注的昵称找到相应的密码，复制或截图发给亲友。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="回寄样本的快递费是谁承担？ ">
                <div className="user-help-list-content">
                  无论是发货给您还是您寄回样本，往返运费全部由小基因承担。温馨提示：收集完样本请尽快寄出，且务必保证在寄出前已成功绑定样本。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="可以在自己账号里绑定别人的样本么？">
                <div className="user-help-list-content">
                  可以。但需要提醒您，每个样本只能被绑定一次，若您绑定了别人的样本，别人将无法再绑定。考虑到查看报告与接收通知的及时便利性，建议您只绑定自己的样本。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="如何绑定样本？">
                <div className="user-help-list-content">
                  绑定样本时，您需要完成系统提示的操作：<br/>
                  a.样本码--贴在收集管上，直接扫码即可；<br/>
                  b.检测密码--若您是购买人，系统会提示您直接选择检测密码；若是亲友帮您买的，您需要向他/她索取检测密码后输入。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="不小心绑定成别人的样本码/检测密码了怎么办？">
                <div className="user-help-list-content">
                  每个样本码/检测密码只能被绑定一次，若您绑定错了，只能找小基因客服人工处理了。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="绑定时找不到自己的检测密码怎么办？">
                <div className="user-help-list-content">
                  若您是自己购买的产品，则可在【我的订单】-【订单详情】中根据备注昵称查到自己的密码，在绑定时根据提示选择正确密码绑定；若是亲友帮您购买的，且他/她之前没有转发您检测密码，您就需要向他/她索取检测密码后输入。
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className="user-help-list list_2">
            <Accordion accordion className="user-help-list-item" onChange={this.onChange}>
              <Accordion.Panel header="如何正确的采集样本？">
                <div className="user-help-list-content">
                  小基因寄给您的样本采集套装包含：<br/>
                  拭子*2、收集管*2、操作说明书*1。<br/>
                  用拭子按要求充分刮擦口腔内侧，晾干后放入收集管，即可完成采样。<br/>
                  温馨提示：请务必严格按照说明书进行采样。<br/>
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="快递过程是否会影响样本发生变质？">
                <div className="user-help-list-content">请放心，晾干后的拭子在快递过程中并不会使样本轻易被破坏。您只需要严格按照说明书采样，收集后尽快寄出，就能大大减少样本变质的可能。</div>
              </Accordion.Panel>
              <Accordion.Panel header="采集样本时有哪些需要特别注意的地方？">
                <div className="user-help-list-content">
                a.一定要先绑定样本！以免采样后一激动忘记了...<br/>
                b.采样前后保证拭子头部只接触口腔内侧黏膜，折断拭子时把拭子头部插入收集管折断而不要用手；<br/>
                c.采样前30分钟内，不得饮食/水、吸烟、嚼口香糖；<br/>
                d.拭子一定要晾10-15分钟再放入收集管！以免滋生细菌。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="我之前买过了，再买其他产品时是否需要重新采样？">
                <div className="user-help-list-content">样本是有保质期的，保质期长短会受到解冻等操作的影响，系统会根据您的样本状态自动判断是否需要重新采样，您只需按照系统提示操作即可。</div>
              </Accordion.Panel>
              <Accordion.Panel header="感冒、发烧时采样会对检测结果产生影响吗？">
                <div className="user-help-list-content">
                  理论上不会。DNA是来自人体的体细胞，感冒发烧不会对它产生影响。但为了保证样本浓度不受细菌或其他因素影响，建议不要在此期间采样，小基因祝您早日康复：）
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className="user-help-list list_3">
            <Accordion accordion className="user-help-list-item" onChange={this.onChange}>
              <Accordion.Panel header="等多久能看到检测报告？">
                <div className="user-help-list-content">
                  从实验室收到您样本起的2周内。<br/>
                  您下单后，小基因火速发货，您严格按照说明书采样后寄回，小基因收货后，实验室开始提取DNA、基因检测、数据解读等步骤，保证您在我们收到样本后2周内在【报告】功能中收到惊喜。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="检测进度在哪里查？">
                <div className="user-help-list-content">
                  点击【我的报告】即可查看当前检测进度，您也可以通过微信通知了解最新检测进度。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="系统通知我“检测失败”怎么办？">
                <div className="user-help-list-content">
                  有2种可能的检测失败：<br/>
                  a.样本未通过DNA质检，无法进入上机检测；<br/>
                  b.通过质检，但因某些特殊情况仍有极小可能导致检测不出结果。遇到检测失败您不用着急，小基因客服会主动联系您并根据不同失败情况解决问题。               
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="同一份报告支持多人查看吗?">
                <div className="user-help-list-content">
                  为保护您的隐私，您绑定的样本所生成的报告只支持您的账号查看。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="报告可以转发分享给好友吗？">
                <div className="user-help-list-content">
                  检测报告分为“专业解读版”和“图文分享版”，后者支持保存为图片后分享给好友；前者不支持直接分享，但您可以截图后分享图片。 
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="检测报告是否适用于临床诊断？">
                <div className="user-help-list-content">
                  小基因出具的检测报告是一种信息提示，是您深入了解自己的参考与补充，以便您做出一些更科学合理的决策，但不可用做个体诊断、用药和治疗的唯一根据，也不能取代医学诊断报告。
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className="user-help-list list_4">
            <Accordion accordion className="user-help-list-item" onChange={this.onChange}>
              <Accordion.Panel header="样本采集器">
                <div className="user-help-list-content">
                小基因寄给您的采样工具，内含：<br/>
                一次性采样口腔拭子2支；<br/>
                一次性采样收集管2支；<br/>
                样本采集操作说明书1份。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="检测密码">
                <div className="user-help-list-content">
                绑定时必须提供的密码，可在【我的订单】-【订单详情】里、微信/短信通知中查看，或向购买人索取。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="样本条形码">
                <div className="user-help-list-content">
                简称样本码，是样本的“身份证”，在两个收集管上是完全一样的，绑定时任选其一即可。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="历史检测人">
                <div className="user-help-list-content">
                与当前账号有关联的已绑定并成功收到报告的检测人，若样本在保质期内，即为“历史检测人”。
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className="user-help-list list_5">
            <Accordion accordion className="user-help-list-item" onChange={this.onChange}>
              <Accordion.Panel header="什么是基因？什么是基因检测?">
                <div className="user-help-list-content">
                  基因是位于我们染色体上携带有遗传信息的DNA片段，是控制性状的基本遗传单位。它控制着我们的生命活动，决定了我们千差万别的外貌、体质、性格等生理特征。<br/>
                  基因检测是通过被检测者体液经提取和扩增其基因信息后，通过特定设备对被其中DNA信息进行检测，分析它所带有的各种基因数据，使人们能够了解自己的基因信息，从而通过改善自己的生活环境和生活习惯，避免或延缓健康问题的发生。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="为什么要做基因检测?">
                <div className="user-help-list-content">
                  人体细胞中含有23对（即46条）染色体。染色体上面有约30亿对碱基，每个碱基位点有4种形式，标注为A、T、G、C四个字母。这四个“字母”可能会发生突变，这样的突变会发生在每个人身上且会对人的遗传和健康造成显性影响，比如酒精代谢能力、睡觉时间早晚、某些疾病发病率等。基因检测，实际就是提早发现这些突变。掌握独特体征、发现健康风险、对比遗传信息，从而极大满足我们探索自身的好奇心，还可据此优化提升生命与生活质量。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="用口腔里细胞做基因检测准么？">
                <div className="user-help-list-content">
                  口腔黏膜内的上皮脱落细胞，具有代谢旺盛、更新快、易脱落的特点，与其他组织细胞一样，具有完整的基因组DNA，可以代替血液样本，是基因检测分型的理想材料。但采集的口腔黏膜样本中，除脱落上皮细胞外，还有口腔中固有的细菌及DNA酶、RNA酶，会加速上皮细胞的破裂及DNA的分解，因此请务必严格按照说明书进行采样。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="儿童、孕妇能做基因检测吗？">
                <div className="user-help-list-content">
                  可以测。基因越早检测，越早受益，因为基因正常状况下是不会轻易改变的，尽早获取一些遗传信息，通过早期预防、优化生活方式来避免一些健康、营养吸收等方面可能面临的问题，是很有意义的。
                </div>
              </Accordion.Panel>
              <Accordion.Panel header="为什么小基因的产品这么便宜？">
                <div className="user-help-list-content">
                  小基因相比于传统基因检测行业，追求的是小而美的检测产品与主题，通过我们的精心挑选与主题设计，可以让您选择只为自己感兴趣的产品买单。另外，小基因采用的是PCR这种低通量SNP位点检测技术，在检测位点量不大时优势明显：准确性高，耗时短，最重要的是价格低。一句话总结：绝不让用户花冤枉钱。
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className="user-help-list list_6">
            <Accordion accordion className="user-help-list-item" onChange={this.onChange}>
              <Accordion.Panel header="如何保证基因数据的安全？">
                <div className="user-help-list-content">小基因所有客户和基因数据均通过多重加密措施进行存储和使用，三层防火墙隔离系统的访问层、应用层和数据层集群，任何人都无法强行获取任何用户信息，全面保护您的隐私。</div>
              </Accordion.Panel>
              <Accordion.Panel header="基因信息将如何使用和披露？">
                <div className="user-help-list-content">小基因可将您的基因数据用于解读挖掘与相关研究。除非由于法律或政府的强制性规定，否则，在未得到您的授权之前，小基因不会向其他任何人或组织透露您的用户信息与基因信息。</div>
              </Accordion.Panel>
              <Accordion.Panel header="实验室如何保存我的DNA？">
                <div className="user-help-list-content">样本送达实验室后，将开启高密度保护程序，杜绝损毁、泄露、丢失的可能。在基因检测完成后，样本将被送入样本存放库，在零下20度冷冻保存。除非得到用户授权允许，否则不对任何第三方开放。</div>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
        <p className="user-set-account-p">未解决的问题可直接回复微信公众号，由人工客服解答</p>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    orderList: bindActionCreators(orderList, dispatch),
    getPayParamer: bindActionCreators(getPayParamer, dispatch),
  },
}))(toJS(Help))));
