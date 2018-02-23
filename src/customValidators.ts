import { ValidationRules } from 'aurelia-validation'

export class CustomValidators {
	public constructor() {
		// field must match other field
		ValidationRules.customRule(
			'matchesProperty',
			(value, obj, otherPropertyName) => {
				const ret =
					value === null ||
					value === undefined ||
					value === '' ||
					obj[otherPropertyName] === null ||
					obj[otherPropertyName] === undefined ||
					obj[otherPropertyName] === '' ||
					value === obj[otherPropertyName]
				return ret
			},
			'${$displayName} must match ${$getDisplayName($config.otherPropertyName)}',
			otherPropertyName => ({ otherPropertyName })
		)
	}
}
