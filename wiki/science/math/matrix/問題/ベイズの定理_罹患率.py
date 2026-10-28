def bayes_theorem(
    prior_disease_prob,
    positive_given_disease,
    positive_given_no_disease
):
    """
    検査が陽性だったときに、その人が実際に病気である確率をベイズの定理を用いて計算します。

    Args:
      prior_disease_prob:        ある人がもともと病気である確率
      positive_given_disease:    検査が病気を正しく検出する確率（感度）
      positive_given_no_disease: 病気でないのに誤って陽性と出る確率（偽陽性率）

    Returns:
      陽性だったときに実際に病気である確率（事後確率）
    """

    # 病気でない確率（非罹患率）
    prior_no_disease_prob = 1 - prior_disease_prob

    # 陽性となる全体の確率（病気あり・病気なし両方からの陽性を含む）
    prob_positive = (positive_given_disease * prior_disease_prob) + \
        (positive_given_no_disease * prior_no_disease_prob)

    # ベイズの定理により、陽性だったときに病気である確率を計算
    posterior_disease_prob = (
        positive_given_disease * prior_disease_prob) / prob_positive

    return posterior_disease_prob


# 例：使用例
prior_prob = 0.01                     # 病気である確率 1%
positive_given_disease_prob = 0.95    # 病気のとき陽性と出る確率（95%）
positive_given_no_disease_prob = 0.20  # 病気でないのに陽性と出る確率（5%）

posterior_prob = bayes_theorem(
    prior_prob, positive_given_disease_prob, positive_given_no_disease_prob)

print(f"検査が陽性だったとき、実際に病気である確率は: {posterior_prob:.4f} %")
