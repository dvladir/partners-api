export abstract class PartnerPredicate {}

export class PartnerPredicateById extends PartnerPredicate {
  constructor(public readonly id: string) {
    super();
  }
}

export class PartnerPredicateBySearchString extends PartnerPredicate {
  constructor(public readonly searchString: string) {
    super();
  }
}
