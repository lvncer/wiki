Godotって「エンジン本体は軽いけど、アセットは外部から集める文化」だから、みんな色んなサイトを組み合わせてる感じ！
まず結論から言うと、初心者〜個人開発ならこの組み合わせがめちゃ強い👇

* 画像・UI → Kenney
* 独特な雰囲気 → itch.io
* 音 → Freesound / Sonniss
* 3D → Quaternius / Poly Haven
* 足りないもの補完 → OpenGameArt

## まず最強なのはこれ

https://kenney.nl

Godot界隈でも「とりあえずKenney使っとけ」ってレベル。
CC0（ほぼ何してもOK）なのが神。

### 特に良い

* UIパーツ
* ボタン
* タイルセット
* 2Dキャラ
* 低ポリ3D
* 効果音

全部「同じ絵柄」で揃ってる。

つまり、

> “寄せ集め感” が出にくい

のが超大事。

個人開発って、「アート統一感」が一番難しいからね。

## 独特な雰囲気を出したいなら

https://itch.io/game-assets/free

ここはインディー作家の宝庫。

### 強いところ

* 雰囲気が独特
* “ゲームっぽさ” が強い
* Godot向け素材も多い
* 無料多い

特に：

* pixel art
* ダークファンタジー
* weird系
* horror系

が強い。
君の「ちょっとハードで独特」みたいな方向性とも相性良さそう。

## 音素材でおすすめ

https://freesound.org

効果音の巨大データベース。

### 良いところ

* 足音
* UI音
* 環境音
* ノイズ
* ドア
* 金属音

みたいな「細かい生活音」が強い。
ただし注意！
ライセンスが混ざってるから、必ず

* CC0
* CC-BY

を見ること。

## 商用でも安心寄り

https://sonniss.com/gameaudiogdc

ゲーム開発者の間で超有名。
毎年GDCで大量の効果音パックを無料配布してる。

### めちゃくちゃ強い

* 高品質
* 商用OK
* プロ品質
* 重厚な音

剣、爆発、SF、機械音とかかなり良い。

## 3Dならこれ

https://quaternius.com

Godot勢めちゃ使ってる。
低ポリで統一されてるから、「とりあえずゲームになる」。

### 向いてる

* ローグライク
* サバイバル
* クラフト
* RPG

## テクスチャ・空・HDRI

https://polyhaven.com

CC0。神。

### 強い

* 空
* 岩
* 地面
* PBRテクスチャ

3Dゲームの質感が一気に上がる。

## なんでもある倉庫

https://opengameart.org

古の巨大サイト。

### 特徴

* 量が異常
* 音も絵もある
* レトロ系強い
* 当たり外れも大きい

「足りないパーツを探す場所」って感じ。

## 個人的におすすめの考え方

最初は、「全部自作しようとしない」
これが超大事。
初心者はだいたい：

* ゲーム制作
* 絵
* 音
* アニメ
* UI

全部やろうとして死ぬ。

だから最初は：

* 世界観
* ゲーム性
* 雰囲気

だけ自分で作って、素材は借りるくらいでちょうどいい。

## Godotで相性いい構成

例えばこんな感じ。

| 要素   | おすすめ        |
| ---- | ----------- |
| UI   | Kenney      |
| キャラ  | itch.io     |
| 効果音  | Freesound   |
| BGM  | OpenGameArt |
| 3D背景 | Quaternius  |
| 空・質感 | Poly Haven  |

これだけでかなり戦える。
あと、Godotは「shader遊び」が超強いから、

* CRT風
* PS1風
* ノイズ
* 暗いライティング

を足すだけで、素材が多少普通でも“自分のゲーム感”出るよ。
ゲーム作り初めてなら、シェーダーは最初かなり「魔法」に見えると思う。でも実際は、

> “画面のピクセルをどう描くかをGPUに命令する仕組み”

って感じ！
Godotはシェーダーかなり強いし、初心者でも遊びやすいから、早めに触るとめっちゃ楽しいよ。

---

## まずゲーム制作全体の中でのシェーダーの位置

ゲームってざっくりこう。

```text
ゲーム
├─ プログラム
├─ グラフィック
│   ├─ モデル
│   ├─ テクスチャ
│   ├─ アニメーション
│   └─ シェーダー ← ここ
├─ 音
├─ UI
└─ レベルデザイン
```

つまりシェーダーは、

> 「絵の見え方を制御する部分」

なんだよね。

## シェーダーで何ができる？

めちゃくちゃ色々できる。

### 1. 光る

- https://images.openai.com/static-rsc-4/ja8iKyx_VxKP7V0H1-ZBtrdLVWAIOxqvEoMkHFcWsMMosVvD8Kb1LX9Xlis8EbhMo0D2TnhwCA_QfwHiKkoftAlYmmIvIHfVl09rTCAi1tISMZPkVxR5mrRb9W85UOq0ohOhFXziw3zR8r_FHK84fCr81-A4RhRTMeesMvMqhjnp4petG0FJZYA2zG_TXgrL
- https://images.openai.com/static-rsc-4/0OATfq_B7wSUyFntuMDPvL_a6Atojj0yTcR0Z1QbuprXkNNb3uSj3a0myirRoYS55yOAJeT1CEuVoOdbREMAH34MpQfa_nNcSf8H8_KFS8L-DZkbnd3Y5ABXhKkUNYJx8Ctt_nvpmMQ58IWjG5XzeGJ-OwkT8dSLRMTXigkaghuFF3nR0kBaxBnEYIftzyD0
- https://images.openai.com/static-rsc-4/HBRonQn7CLMg35nI8qFUVgA8gzDVnGLexrBrcbHB3jqGHHkXGvPJNa92LChhDxZmG-W0WBUEWVutgqjkWZoBl6MYck5hSvcmzZNsW70ZQztyfO7dp6ZY9f0FBqTE04rlb-Y1jyGWNatSbgrEs37sGCQ5g08evJQFb2RYSd-tn3T8-S99g4Lq1mUvYMyC4Qhy
- https://images.openai.com/static-rsc-4/jOARKvo__I4coibsGHYAZDdXahx-qFo5FoCQHFk-exiAwULWNxZYSZznqoXBrfsgWyyCDmLTqS62pyQq_BB27JiC3dS6NhnVqW6rsM8pVyhGFHVZbGBFMhKA8q-crv3sUvxWA3mrsJkqChtVMglu5VI461nIc_91CnCNsMgv30BfOw9rlUV--l4eXW7Ymcds
- https://images.openai.com/static-rsc-4/4Dv-2Ed2L1sYlqq7eeEUQxTUDLL_mbawT3Zz7j9UCLm37CWHZ4E0oUpS12Ssgho_EMKfAlDJplnfylw4ih1XVo7UaXaF_4pk5UgOVLK_PhKG4etEn_ujRljOVPU2oAgHR6U0zLZo5hdKWo39_gijWCOIU92nmD_Ldthk2614d8oWGg9hStkxV8nQ8ZG7N868
- https://images.openai.com/static-rsc-4/xPM6y2d7pAFsJG7VxdjbPO53KrGsaQ5srw3v1VGm_zGpID8w0BkAYo-ie7wtlxmIReHcCuGPpZutFUZMJbHtp21WqyotQoaxbXNdVp8SwEAJ8ygL3bTBr9e-QAM5Pt9Sy5ZnagbkxOmw04t8-hoPP3r5TJYuNN0oWsOd4pRKNz7Lr2pw_Rbm7TyNXuc0wAuN
- https://images.openai.com/static-rsc-4/LiSwG4d8UNF1JcpsKjYX3m2X2sex4p6lTb_RTXw5fq-XNC7pQWDA5WZhjEQQL0px4_NlmGvj2YvN18UDXZF6KMGXLd7FjfXqM9kad5unCcfKQlleZo08ObMKcWEiyXDJU4qQmPFqbbpxcOMb_ntcdBYXJSJNGYnVyZEsxV1OjXf6LjP7ccVETMEtvIVbuhtG
- https://images.openai.com/static-rsc-4/FlJPjJ45uVWmKAPEHbEIvaS1oXxFI9bJ5N8FfNDrY05RMlQHxiyJkGXR4NTRP6CbSKnm2_ZqGlVlRI4v8VBTIaae4_TgKPw3fjZw4ZI633fziiXj9WuzuN3zWwN1Dd5s9uiYk_GajX7V2M7qJ19xnsxf2eyAjlitkplhn-8BWjQXC1bAeZPlagH2awjbZ9h4

* ネオン
* 魔法
* サイバー感
* 剣の発光

### 2. 水

- https://images.openai.com/static-rsc-4/7m2cx2YLUgKybgkHRwKdFaX3a-N4LBCe52F-iDcMsxOznQPSkI_sX75g28C7adryrg5J-qrNPzBMWr_lDRS9gRxMNo8IwSsIojY9bHLrX9J4mZNzPsbmPYydhfxX0RLlEmL9cbz_OdHHkDa_PDDM4BC3F0al1b5xi4GGY9h44NRC_722okK3dOQLrMfTQ6i0
- https://images.openai.com/static-rsc-4/srsqqLwHi7gF8x5w9eVEdiSyD3li4m8MpMJaEcN-AGC0gHcyqR2jYz-4V50YUcnG9uFE-X0w_7NXPzkYETy5-5iNzNRzMsYorPlDzYpHqTHPgWDhbpCufjYASKhP57nSw5blkQife3hog_aerzEuFbf5BSSkT7bQMoMiB2vXSb1E8Oq3yXfDOspthY5h-PlY
- https://images.openai.com/static-rsc-4/yQBNY_LG9429b_F7gLnsOjNy_OrtHl6n3RbkCWBlaQu_5jiKIR3RUgvrAZyZQ1xLNr7Sl5Pu2NU0prect357u7KBAjpmYbXr0ERu-bYFt3FndvuHH5mKJjxsCWOCk8TNv62QxlzEnBO_DVW88sVFROEnlTocFLRq0_a4gDBF_3bTTYef1OfXxca7d22keC9M
- https://images.openai.com/static-rsc-4/5IKCXlJB1QGpbSvgTJIm5GVOMAdqVuD901Mr-UDA-xx5MUHc2n0cyBm1YjR7WTB4LZRuIfeoAu3mVoC43m4Vei9YRdsTSjUN7EssSBOpfSuIoTjKTrB82Pcz6bOwAMwL3NpP-5Zfdk37kvv81Gw05MadyYkNaRCxtFQxvJ7rRE1cQdCA3TMwskafVw6c9BDQ
- https://images.openai.com/static-rsc-4/WRA6tK76acqoliqKM8d--cpbb0rjBh1tWYg_KfmnreWjeJLhVwRAiRhamcnFfDjwXjUIsS2t261kVTnttiEijMc42gCdxgjQnsW1DWBt6xdM7ddac1AS97Rz5AMT5vOct-RI_iysYLnRiNYOhp7JHpJK7_jh6Zudgnu_COOmUCbfIjCqx9xgrvGZeiEToAwm
- https://images.openai.com/static-rsc-4/rf-akaLmv20ONTO3zxLSwvRn0V_U_yBBd9gFVNe2RdMc_g5PvSOgoy9o4XdGQysO_wdXv0aI78i0qQBryx82OI1K-qfp6ju9JJW_QajAD24wObopi8N_ywj7DsDx1RxGgb8JBkN8trJzErJizWmuRRZmKAPZjAiuVuddYFy8lbmEjvEV6sRRdWGCao_yEHsU
- https://images.openai.com/static-rsc-4/_nXUKDiECSvOfO1UyZ5rEf3yk0i-EzD1-pYQym1_yRckXNRF10JM8k5EiQznT5bmGHWBtNtZuEJZ1atV6wBtiWLd1q2rd1GFb3V_TpQ3juA6I7iR_pq9wTvHt2zyib5wESRosn2_J0eddI35xpv63_LRV8pTdjByH6OUvYLeio26_X8Vlecm84ODT9pv-eOR
- https://images.openai.com/static-rsc-4/61gd9z0KWfz9m2yJT3VIY_UxfL6RtpTBFuVRP25lFBVTiDB5YpkwAGSouVm1mpBVJNeUr-wmSAGhD4bwkMyphdfpzh3bOZkQPqKJhgyO8DcpvE8cpXviNv0qbxvlWJzZiZpioWMIXr6_x9UP7aN_gmSYh32Ml1ggApiWgCR8vI2CVRUEFRGFEUDhUgIxJYLI

* 波
* 揺れ
* 反射
* 泡

### 3. 画面エフェクト

- https://images.openai.com/static-rsc-4/118p4nW7sIJLjnjfH-v3oGxWyEddZ7l2wT_TP4OCs4Ezm0F6i11VvYVQ8aBgnIsC6GL38O5lveGkyMf8vM073mqToDtkUFryR9z2AsTG6uN8ecfT17HX7IcqM5i3akHXOCUXCTKD-zlhvXmEFbJX4wEs0ZyiknmZVrh_Ia3MYrY3q_mJ-1er6pzymSNaDTuK
- https://images.openai.com/static-rsc-4/TQHlXcTCCrmvnQtqI9mO0H06ir0frDBzDXrOuHAAHp2u3edT_Le_cNjI3RBCl0LUMoovoeyb10MedL0V-2yR6CRf7dSIsqPn6528EhQFyoCUn1uKvdKJf4sm-20gpAW89rzKFg_KlGgFrJAotJtn9-pNwd3VFKlgZXBc8tfFNY9enAkVgQQd5GLNucqS7Tjk
- https://images.openai.com/static-rsc-4/k5FozcgLTby7teRZvnG5QxsU5WRffT3C7940blDxgYOVoEXLlHayplGqRW7Cdve0Sc1hi0VyITbFoqTtP2hHp78O9_iih9aLtZNhk9I0wR8vjOlE-EQQlflAnhIw90iT00DiwYdp6xWu7zmrHfR2RPWOvEjn24twybH6MtBKxYinv199xCEez9fP2QAfgK4p
- https://images.openai.com/static-rsc-4/nYOSjceZpj3u4PNGHTZJLF11LlNAiEMWSLybuuRxW-SjzniiIp-NAsUIQtluHaj6huTCRjesXoQRvN9jMWPHIybtUeM3QuFrdMSYQybkkvE0k1kY24qH3cYHydqSNCmkzOwR-ozIAShSjDknH7oKBfvGjjJFqGYnqxVqrYMLt-5itubZhU2tGUAAJITVJV2F
- https://images.openai.com/static-rsc-4/RbqMzq7UOOiSRcz2mgZ8GA5hdxAf6KAupFvOBF2N2wi7NinfZDndcwrHs4GSCdnPZPLdaWHvxjf2GY9AEge1RW62pwzSDRnXv_ehkZZy60xlGRYnXrN5JwxAPYJWgs1Vda6YJlM0GJiPco9mraI5EPd-ACECQGCI5lTdM_yAhZbCm-Xabmr7ZPECzTcxsBiL
- https://images.openai.com/static-rsc-4/49sabJIGtiQfEbeUA1YRFO7aahcfEUJjeEB_pjouIBM4KIXwD2Djx5TEtrWY9U7hkv0vgtOh2PUh-FCMpZ-af3SkRKURvOm6Pv6kiGafhnW-mV2lsxUOwsvGKUuuPQ_cfCSOsyUOGKChctUos3IjdBxdMezlShj78CrT7idmnVAFwurdBXDSZc4LGH5NIMxm
- https://images.openai.com/static-rsc-4/aBpj6TQ9_fWRDqQbCenBoboxrS3z8VrViHN8NXKXT07HX-QQMnceqXJ9U1f8slIAg_KCqAtinqLXGEhD-RL5Yfe8sElNHHq3Yc1Br8h4y2Sp98kJqK_H0grEh3seZR2DJedjJSy7YJnD8VrqbutWbUmEbAA1s1LJD4eKVRAUcCDMv7z292TR4yH4rFg0acHN
- https://images.openai.com/static-rsc-4/b2Ku4PSbkAHI9NUBBDYHzJlqgCfJUGxy0tbnoNjTtrK5scyvZGdcuCkJxBS8g7MifupcSxZprX_6qRdMyUb-HyQmXU8C2xeNjacRcWFDZZFHT6pggmLPygKGLvNNesAfNH1bUHkCv_z66ORMSNbhsRIAJBChMqeE3h65CRZ-IZxKP3po-ThfINW46UFbSLzd

* CRT
* VHS
* PS1風
* ノイズ
* グリッチ

こういう“雰囲気作り”が超強い。

### 4. キャラ演出

- https://images.openai.com/static-rsc-4/UCAOQ0VGz-1WCDuXcIZ7JJbMnpgZHR-YFjPWMbXh6R6rEk98JP3cXUlh1UleWAQyBgS6iq5lfHF5Y3WIPvMiZGIlsh2A0zmCcGOGZ1nLtbOM4mH2JagEaosQ7dr_VW16dCgo-ZDP9yq-XMc-1V0pmkg2ZIiA2EAJS06p_V67iulCQigsBH0Lnjh-NXkJRTaY
- https://images.openai.com/static-rsc-4/macxDHEW5JocDvtgKqMoQ6IP1gSKwhGYeECgMCK334Jcs2OaujuxHJk7Q30_J9VnA3zA2WEXDQDDwQa_oHht9WrSzfY0WxEaLHnon9Hwhmxl1-vEx-5bX7kxPx-aM8Ju8CmKAKla0cCREANIhVhBzDKumeoxC1xQYPF2-48UCQRQA9HSRRyPcueMEZB8iy9J
- https://images.openai.com/static-rsc-4/BRRS9Og3VPZEQQpc_vxsbt3RBwAUofbf1nX7Uw0ctMO9eYkkeZWZrDV2fDnRbg833fM5Xm-ue8vuQdaA-k-ZSFv3BkrTFcSHwFzTu2t86xsWT61MDn6kJ0Jfm1TMA4WDHBv8FKnoKdHW8BhMkQE5S9fguIntdHldqTxXY1-ZNMWdK1JCo1IVqnHxe_bj1RSt
- https://images.openai.com/static-rsc-4/PdNMQcquYXX-qhA_c3xbq161IRLwtqPxmk0qT1_qBpS_Q-myzmXjQd8fdaQIgPyp83p4CQL3lKhTggEzCAYdlG3-npLPdrjtW6V4w-QWvKQAWYDm0W3JJ9YaVolVR3dcWzfGlYfpk3jMktBHORaGxPbeNCwZ3LOhNOEou03oo7N6WBrh46vtvGYo0dSrISkW
- https://images.openai.com/static-rsc-4/FOOWCfYMaBnF5UueN__RttDdHPCSL6BE4FgkGMkuQav3vjTgNEfyBDZ2dASR3aYC5-tMVOVF2-NJF1LTjlnYgMfIQOp5dpAjF4ZI_HfA39pFadtlg6aAjqZ4vkpO9GyOze3QOsyLVHDM8Bk5gdsP9Y0P56I0MgR0SCU0Y3veZ_9fLINLc9ZR_CPNa93JDmBZ
- https://images.openai.com/static-rsc-4/rKIfufOGcwMy6lylv4iLOz2OV-AIzFMKu55NMuUhqwK_0Wa6tP1Bq1XI24q6f8igEI4gB6cesMYfQONip1baRlu3ptz7uqxQIK4fsnGJJ4BvASZ2XC93ET4L7IXYuoIZqh5yUaFoae3NkL-THsDwldELntmupB_JVRp9d0XqnalIiiRKACE58R_8G3Zc8009
- https://images.openai.com/static-rsc-4/9PQDrTSFfvs4idPuD13AzNNdc7w05PlpfJZb7m5JGl6ssDXiR1E65vWyomryeWWnBKuSq-lpWN8QK5QMx05JMegEfpIup5aWaIdsWGdhzOUalELB6GMOXlfUVizchWzkP2hFXcGevRZZ2e9ayNgzFYcksLhqszuze61yah7TnPelpxNozzZqDCPTPrmT0gzx

* ダメージ時白く光る
* アウトライン
* 溶ける
* アニメ風

## 初心者向けに超ざっくり言うと

### 普通の絵

```text
画像をそのまま表示
```

### シェーダーあり

```text
画像を「計算してから」表示
```

## Godotのシェーダーが初心者向きな理由

### Shader Languageが簡単

Godot独自だけど、GLSLベースで比較的読みやすい。

例えば：

```glsl
shader_type canvas_item;

void fragment() {
    COLOR = vec4(1.0, 0.0, 0.0, 1.0);
}
```

これだけで真っ赤にできる。

## 用語を最初に整理

- マテリアル: 「この見た目で描画してね」

#### 例

* 金属
* 水
* 光る
* 透明など。

- シェーダー: 見た目の計算ルール
- テクスチャ: 画像データ
- GPU: 絵を描く専用の超並列CPU

シェーダーはGPU上で動く。

## Godotで実際どう使う？

```txt
Sprite2Dを置く
↓
Material追加
↓
ShaderMaterial
↓
Shaderを書く
```

## 初心者が最初に覚えるべきシェーダー5選

### 1. 点滅（超簡単）

```glsl
shader_type canvas_item;

void fragment() {
    COLOR = texture(TEXTURE, UV);

    COLOR.rgb *= sin(TIME * 5.0);
}
```

TIMEで色を周期変化

### 2. 波打ち

```glsl
UV.y += sin(UV.x * 10.0 + TIME) * 0.02;
```

水とか布っぽくなる。

### 3. 白フラッシュ（ダメージ演出）

```glsl
COLOR.rgb = mix(COLOR.rgb, vec3(1.0), 0.5);
```

アクションゲームで超使う。

### 4. ノイズ

```glsl
fract(sin(dot(UV.xy ,vec2(12.9898,78.233))) * 43758.5453)
```

これだけで世界が変わる。
グリッチとか作れる。

### 5. dissolve（消滅）

敵が灰になるやつ。
めっちゃゲームっぽい。

## 初心者がやりがちなミス

### 「全部シェーダーでやろうとする」

これは危険。
シェーダーは見た目特化であって、ゲームロジックではない。

## 先に覚えるべき順番

おすすめ順。

### 最優先

1. シーン
2. ノード
3. GDScript
4. 当たり判定
5. アニメーション

### 次

6. パーティクル
7. ライティング
8. シェーダー

### 後半

9. 最適化
10. カスタムレンダリング

## 「ゲームっぽさ」を出す最強コンボ

実は、

```text
シェーダー
+
パーティクル
+
画面揺れ
```

これだけで急にプロ感出る。

## 初心者向けおすすめ学習法

### 最初は「改造」から

いきなりゼロから書かなくていい。
Godot Shadersってサイトが神。

https://godotshaders.com

ここで：

* water
* glow
* outline
* pixel
* dissolve

とか検索して、`数値だけ変える` から始めると超理解進む。

## 個人的におすすめの進め方

- Step1: 四角を動かす
- Step2: 攻撃作る
- Step3: パーティクル
- Step4: シェーダーで光らせる
- Step5: 画面演出

ここまで行くと、一気に「ゲーム作ってる感」が出る。
しかもGodotは軽いから、試行錯誤がめっちゃ楽なんだよね。

---

最初ここかなり混乱するよね。
ゲーム開発って「コードを書く」より、

> 「どこに何を置くか」

の方が実は大事だったりする。
特にGodotは自由度高いから、最初に整理ルール作らないと後半で爆発する。
なので、初心者〜中規模くらいまでかなり戦える構成を、「全部込み」で説明するね。

## まずGodotの基本構造

Godotは、

```txt
Node
↓
Scene
↓
Game
```

でできてる。

## イメージ

```txt
Player(Node)
├─ Sprite2D
├─ CollisionShape2D
├─ AnimationPlayer
└─ Camera2D

↓
これを保存
↓
player.tscn
```

つまり、`Scene = 部品` なんだよね。

## 大きなゲームはこうなる

```txt
Game
├─ Player Scene
├─ Enemy Scene
├─ UI Scene
├─ Stage Scene
└─ Effect Scene
```

Unityよりも：

> 「SceneをPrefabみたいに使う」

感覚が強い。

## おすすめディレクトリ構成

これかなり実践的。

```txt
project/
├─ assets/
│   ├─ art/
│   │   ├─ characters/
│   │   ├─ enemies/
│   │   ├─ ui/
│   │   ├─ tiles/
│   │   └─ backgrounds/
│   │
│   ├─ audio/
│   │   ├─ bgm/
│   │   ├─ sfx/
│   │   └─ voice/
│   │
│   ├─ shaders/
│   │
│   ├─ fonts/
│   │
│   └─ vfx/
│
├─ scenes/
│   ├─ player/
│   ├─ enemy/
│   ├─ world/
│   ├─ ui/
│   ├─ effects/
│   └─ test/
│
├─ scripts/
│   ├─ player/
│   ├─ enemy/
│   ├─ systems/
│   ├─ ui/
│   └─ managers/
│
├─ resources/
│
├─ autoload/
│
├─ addons/
│
└─ main.tscn
```

## 重要なのは「役割分離」

初心者は最初、

```text
player.png
player.gd
player.tscn
```

を同じ場所に置きがち。
でも大規模化すると死ぬ。

## なぜ分ける？

### assets

素材そのもの

* png
* wav
* shaderなど。

### scenes

ゲーム部品

* player.tscn
* enemy.tscnなど。

### scripts

ロジック

* movement.gd
* hp_system.gdなど。

## 実際のPlayer構造

例えば：

```text
scenes/player/player.tscn
scripts/player/player.gd
assets/art/characters/player.png
```

みたいになる。

## Node構造も超重要

例えばPlayer。

```txt
Player(CharacterBody2D)
├─ Sprite2D
├─ CollisionShape2D
├─ AnimationPlayer
├─ Camera2D
├─ GPUParticles2D
└─ HurtBox
```

## 役割

- CharacterBody2D: 移動の本体
-  Sprite2D: 見た目
-  CollisionShape2D: 当たり判定
-  AnimationPlayer: アニメ制御
-  GPUParticles2D: 煙・火花

## 「システム」は分離する

これ超大事。

### ダメな例

```gdscript
player.gd

- HP
- 攻撃
- UI
- 音
- セーブ
- エフェクト
```

全部入れる。
これで死ぬ。

### 良い例

```txt
player.gd
├─ movement
├─ attack
├─ animation
└─ health
```

役割ごとに分ける。

## manager文化

ゲームではよくある。

```text id="x8blf4"
GameManager
AudioManager
SaveManager
UIManager
```

など。

## autoloadって何？

Godot特有。
どのSceneでも存在するSingletonって感じ。

### 例えば

#### AudioManager

どこでもBGM再生できる

#### 配置

```text id="5v4vm0"
autoload/
└─ audio_manager.gd
```

## Shaderの置き場所

おすすめ。

```text
assets/shaders/
├─ water.gdshader
├─ crt.gdshader
├─ dissolve.gdshader
└─ outline.gdshader
```

## エフェクト管理

これも大事。

```txt
scenes/effects/
├─ hit_effect.tscn
├─ explosion.tscn
└─ dust.tscn
```

## テストScene作ると超楽

初心者はこれやらない。
でも超重要。

```text id="3sqowg"
scenes/test/
├─ test_player.tscn
├─ test_enemy.tscn
└─ shader_lab.tscn
```

ここで実験する。

## Godot初心者が最初に作るべきもの

おすすめ順。

### 1. Player

```txt
移動
ジャンプ
攻撃
```

### 2. Enemy

```txt
追跡
ダメージ
死亡
```

### 3. UI

```txt
HP
メニュー
```

### 4. Effect

```txt
ヒット
爆発
```

### 5. Scene遷移

```txt
タイトル
↓
ゲーム
↓
リザルト
```

### その後にShader

## 実は超重要な考え方

「Scene = Legoブロック」

これ。
Godotは、「小さいSceneを組み合わせる思想」がめちゃ強い。

## 例えば

```text id="5em8rx"
Sword.tscn
+
Player.tscn
=
武器持ちプレイヤー
```

みたいに合体できる。

## 初心者にありがちな事故

### main.tscnが巨大化

```txt
Main
├─ Player
├─ Enemy100体
├─ UI全部
├─ Stage全部
├─ Effect全部
```

やばい。

### 正しくは

```txt
Main
├─ World
├─ UI
└─ Managers
```

くらいにする。

## 最後に超大事な話

ゲーム制作って、「綺麗に整理できる人」が強い。
マジで。
後半になるほど：

* コード力
* 絵
* 数学

より、整理能力が効いてくる。
なので最初から：

* フォルダ整理
* 命名
* 役割分離

を意識すると、後で自分を救うよ。
