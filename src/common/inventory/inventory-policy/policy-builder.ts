export enum TransactionType {
  NONE = 0,
  IN = 1,
  OUT = 2,
}

export class PolicyBuilder {

  static build(config: {
    // stock_effect_ic: number;
    document_type?: string;
    transaction_type?: TransactionType;
  }) {

    const transactionType =
      config.transaction_type ??
      TransactionType.NONE;

    const transactionTypeLabel =
      TransactionType[transactionType];

    /**
     * ============================================
     * NO STOCK EFFECT
     * ============================================
     */

    if (config.document_type === 'NONE' ) {

      return {

        stock_effect_ic: 0,

        transaction_type:
          transactionType,

        transaction_type_label:
          transactionTypeLabel,

        affect_on_hand: false,

        on_hand_sign: 0,

        affect_reserved: false,

        reserved_sign: 0,

        available_sign: 0,

        document_type:
          config.document_type,
      };
    }

    /**
     * ============================================
     * ON HAND
     * ============================================
     */

    const onHandSign =
      this.getOnHandSign(
        transactionType,
      );

    const affectOnHand =
      onHandSign !== 0;

    /**
     * ============================================
     * AVAILABLE
     * ============================================
     */

    const availableSign =
      onHandSign;

    /**
     * ============================================
     * RESULT
     * ============================================
     */

    return {

      // stock_effect_ic:
        // config.stock_effect_ic,

      transaction_type:
        transactionType,

      // transaction_type_label:
        // transactionTypeLabel,

      document_type:
        transactionTypeLabel,

      affect_on_hand:
        affectOnHand,

      on_hand_sign:
        onHandSign,

      // affect_reserved:
      //   false,

      // reserved_sign:
      //   0,

      // available_sign:
      //   availableSign,
    };
  }

  /**
   * ============================================
   * ON HAND
   * ============================================
   */

  private static getOnHandSign(
    type: TransactionType,
  ): number {

    switch (type) {

      case TransactionType.IN:
        return 1;

      case TransactionType.OUT:
        return -1;

      default:
        return 0;
    }
  }
}