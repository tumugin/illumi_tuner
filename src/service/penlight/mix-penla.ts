import AbstractPenlight from './abstract-penlight'
import PenlightColor from '../../models/penlight-color'

export default class MixPenla extends AbstractPenlight {
  availableColors = [
    new PenlightColor('#DC0009', 'レッド', true),
    new PenlightColor('#F74964', 'エンジレッド', false),
    new PenlightColor('#F34593', 'ローズ', true),
    new PenlightColor('#1325FC', 'ブルー', true),
    new PenlightColor('#B3BCF7', 'ライトブルー', false),
    new PenlightColor('#C9D1F7', 'アイスブルー', false),
    new PenlightColor('#6FC7F5', 'アクアブルー', true),
    new PenlightColor('#ECE633', 'イエロー', true),
    new PenlightColor('#E8E970', 'ライトイエロー', false),
    new PenlightColor('#F96524', 'オレンジ', true),
    new PenlightColor('#F28F39', 'パッションオレンジ', false),
    new PenlightColor('#EEB130', 'ヤマブキオレンジ', false),
    new PenlightColor('#1BB626', 'グリーン', true),
    new PenlightColor('#C9FB9A', 'イエローグリーン', false),
    new PenlightColor('#45E5A5', 'ライトグリーン', false),
    new PenlightColor('#4BE6AA', 'ペパーミントグリーン', false),
    new PenlightColor('#5CD5D3', 'エメラルドグリーン', true),
    new PenlightColor('#E833B7', 'ピンク', true),
    new PenlightColor('#F95AAC', 'ピーチ', false),
    new PenlightColor('#F5A0E1', 'サクラピンク', false),
    new PenlightColor('#B977F6', 'バイオレット', true),
    new PenlightColor('#DC95F2', 'パープル', false),
    new PenlightColor('#E967F4', 'ラベンダーパープル', false),
    new PenlightColor('#F1F2FD', 'ホワイト', true)
  ]
  isColorAdjustable = false
  productManufacture = 'ターンオン'
  productName = 'MIX PENLa PRO'
}
