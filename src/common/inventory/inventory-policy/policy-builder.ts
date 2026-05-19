export type TransactionType =
  | 'IN'
  | 'OUT'
  | 'RESERVE'
  | 'RELEASE'
  | 'NONE';

export class PolicyBuilder {

  static build(config: {
    stock_effect_ic: number;
    document_type?: string;
    transaction_type?: TransactionType;
  }) {

    const transactionType =
      config.transaction_type ?? 'NONE';

    // ==================================================
    // 1. ON HAND LOGIC (physical stock)
    // ==================================================
    const onHandSign =
      this.getOnHandSign(transactionType);

    const affectOnHand =
      onHandSign !== 0;

    // ==================================================
    // 2. RESERVED LOGIC
    // ==================================================
    const reservedSign =
      this.getReservedSign(transactionType);

    const affectReserved =
      reservedSign !== 0;

    // ==================================================
    // 3. AVAILABLE (derived)
    // ==================================================
    const availableSign =
      this.getAvailableSign(
        onHandSign,
        reservedSign,
      );

    // ==================================================
    // RESULT
    // ==================================================
    return {
      stock_effect_ic:
        config.stock_effect_ic,

      transaction_type:
        transactionType,

      // ON HAND
      affect_on_hand:
        affectOnHand,

      on_hand_sign:
        onHandSign,

      // RESERVED
      affect_reserved:
        affectReserved,

      reserved_sign:
        reservedSign,

      // AVAILABLE
      available_sign:
        availableSign,

    document_type: config.document_type,
    };
  }

  // ==================================================
  // ON HAND
  // ==================================================
  private static getOnHandSign(
    type: TransactionType,
  ): number {

    switch (type) {

      case 'IN':
        return 1;

      case 'OUT':
        return -1;

      default:
        return 0;
    }
  }

  // ==================================================
  // RESERVED
  // ==================================================
  private static getReservedSign(
    type: TransactionType,
  ): number {

    switch (type) {

      case 'RESERVE':
        return 1;

      case 'RELEASE':
        return -1;

      default:
        return 0;
    }
  }

  // ==================================================
  // AVAILABLE (derived rule)
  // ==================================================
  private static getAvailableSign(
    onHand: number,
    reserved: number,
  ): number {

    // priority: on_hand first
    if (onHand !== 0) {
      return onHand;
    }

    // reservation affects opposite side
    if (reserved !== 0) {
      return -reserved;
    }

    return 0;
  }
}