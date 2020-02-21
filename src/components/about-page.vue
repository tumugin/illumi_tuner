<template>
  <b-container>
    <h1>
      これなあに
      <small>IllumiTunerについて</small>
    </h1>
    <p>ペンライトの色を楽に設定できるようにしたものなのです。イルミルミルミルミって感じにね?</p>
    <h2>使い方</h2>
    <b-alert show>
      現在はMIXPenlaにのみ対応しております。近日中にKING BLADEへの対応を行う予定です。
    </b-alert>
    <p>
      <router-link to="/">
        トップページ
      </router-link>
      でアイドルを選択するだけ！以上！
    </p>
    <p>あとは表示されたペンライトの色に従って手持ちのペンライトに色を設定するだけです。</p>
    <p>
      ペンライトの色は<b>#17エメラルドグリーン</b>のように色変更ボタンを押す回数も併記されているので、表示されている回数を押してください。
      (回数は一番最初に表示される色から数えた数です)
    </p>
    <h2>仕組み</h2>
    <p>
      データの取得元である、<a href="https://sparql.crssnky.xyz/imas/">im@sparql</a
      >からアイドルの名前と色と所属を取得し、
      ペンライトで発色可能な色と一人ひとりのアイドルの色との色差を計算し一番差が小さい色を選択しています。
    </p>
    <p>
      ちなみに、色差はすべてCIEDE2000色差式を使用して計算しています。(RGB色空間におけるユークリッド距離など色々試してみましたがこれが一番結果が良かったです)
    </p>
    <p>
      現状すべて自動計算だと一部アイドルの色が正しく選択されない事が分かっているので、明らかに違う色が選択されているアイドルに関しては
      例外として自動選択をやめて予め指定された色を選択するようにしています。
    </p>
    <b-alert variant="danger" show>
      作者はすべてのアイドルの色を把握している訳ではないので、今も間違った色が指定されているかもしれないです。
      その際には<a href="https://twitter.com/myskng">Twitter</a>等で教えていただければ幸いです。
    </b-alert>
    <h2>なんでこれ作ったの?</h2>
    <p>
      Vue.jsの勉強に何か作ろうかなと考えてたらこれを思いついたので作りました。
      作者は残念ながらデザインのセンスが皆無なので殆どのUIの部品についてはBootstrap3に頼っています。
    </p>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({ name: 'AboutPage', title: 'これなあに - IllumiTuner' })
</script>

<style scoped></style>
