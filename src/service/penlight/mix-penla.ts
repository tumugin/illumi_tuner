import AbstractPenlight from './abstract-penlight'
import PenlightColor from '../../models/penlight-color'

export default class MixPenla extends AbstractPenlight {
  availableColors = [
    new PenlightColor('#DC0009', '#1レッド', true),
    new PenlightColor('#F74964', '#2エンジレッド', false),
    new PenlightColor('#F34593', '#3ローズ', true),
    new PenlightColor('#1325FC', '#4ブルー', true),
    new PenlightColor('#B3BCF7', '#5ライトブルー', false),
    new PenlightColor('#C9D1F7', '#6アイスブルー', false),
    new PenlightColor('#6FC7F5', '#7アクアブルー', true),
    new PenlightColor('#ECE633', '#8イエロー', true),
    new PenlightColor('#E8E970', '#9ライトイエロー', false),
    new PenlightColor('#F96524', '#10オレンジ', true),
    new PenlightColor('#F28F39', '#11パッションオレンジ', false),
    new PenlightColor('#EEB130', '#12ヤマブキオレンジ', false),
    new PenlightColor('#1BB626', '#13グリーン', true),
    new PenlightColor('#C9FB9A', '#14イエローグリーン', false),
    new PenlightColor('#45E5A5', '#15ライトグリーン', false),
    new PenlightColor('#4BE6AA', '#16ペパーミントグリーン', false),
    new PenlightColor('#5CD5D3', '#17エメラルドグリーン', true),
    new PenlightColor('#E833B7', '#18ピンク', true),
    new PenlightColor('#F95AAC', '#19ピーチ', false),
    new PenlightColor('#F5A0E1', '#20サクラピンク', false),
    new PenlightColor('#B977F6', '#21バイオレット', true),
    new PenlightColor('#DC95F2', '#22パープル', false),
    new PenlightColor('#E967F4', '#23ラベンダーパープル', false),
    new PenlightColor('#F1F2FD', '#24ホワイト', true)
  ]
  isColorAdjustable = false
  productManufacture = 'ターンオン'
  productName = 'MIX PENLa PRO'
}
