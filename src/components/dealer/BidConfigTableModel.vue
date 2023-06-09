<template>
  <tr :id="componentId" class="config-model table-secondary">
    <td
      class="can-toggle font-weight-bold align-middle"
      @click="$emit('toggle-hide', option.year + option.model)"
    >
      {{ option.year }}
    </td>
    <td
      class="can-toggle font-weight-bold align-middle"
      @click="$emit('toggle-hide', option.year + option.model)"
    >
      <div class="d-flex justify-content-between align-items-center">
        {{ option.model }}&nbsp;
        <strong>{{ toggled ? '+' : '–' }}</strong>
      </div>
    </td>
    <td></td>
    <td></td>
    <!-- Edit below -->
    <td>
      <label v-if="listing_discount_type_value === '% Off MSRP'">
        <input
          v-model.number="listing_discount_value"
          class="model-listing-discount-value form-control form-control-sm"
          :placeholder="listing_placeholder"
          :disabled="disabled"
          type="number"
          min="0"
          max="100"
        />
        %
      </label>
      <label v-else>
        <currency-input
          v-bind="{
            currency: 'USD',
            precision: 0,
            distractionFree: true,
            valueAsInteger: true
          }"
          v-model.number="listing_discount_value"
          class="model-listing-discount-value form-control form-control-sm"
          :placeholder="listing_placeholder"
          :disabled="disabled"
        />
      </label>
    </td>
    <td>
      <label>
        <select
          v-model="listing_discount_type_value"
          class="model-listing-discount-type form-control form-control-sm p-0"
          :disabled="disabled"
        >
          <option value="% Off MSRP">Percentage</option>
          <option value="USD Off MSRP">Amount</option>
        </select>
      </label>
    </td>
    <td></td>
    <!-- Edit end -->
    <td>
      <label v-if="bucket_discount_type_value === '% Off MSRP'">
        <input
          v-model.number="bucket_discount_value"
          class="model-bucket-discount-value form-control form-control-sm"
          :placeholder="bucket_placeholder"
          :disabled="disabled"
          type="number"
          min="0"
          max="100"
        />
        %
      </label>
      <label v-else>
        <currency-input
          v-model.number="bucket_discount_value"
          v-bind="{
            currency: 'USD',
            precision: 0,
            distractionFree: true,
            valueAsInteger: true
          }"
          class="model-bucket-discount-value form-control form-control-sm"
          :placeholder="bucket_placeholder"
          :disabled="disabled"
        />
      </label>
    </td>
    <td>
      <label>
        <select
          v-model="bucket_discount_type_value"
          class="model-bucket-discount-type form-control form-control-sm p-0"
          :disabled="disabled"
        >
          <option value="% Off MSRP">Percentage</option>
          <option value="USD Off MSRP">Amount</option>
        </select>
      </label>
    </td>
    <td></td>
  </tr>
</template>

<script>
  // Core
  import { actor, get } from '@/store/modules/dealer/constants'
  import { createNamespacedHelpers } from 'vuex'
  import { exists } from '@/utilities'
  // Components
  // import BidConfigTableTrim from '@/components/dealer/BidConfigTableTrim'

  // Config
  const { mapActions, mapGetters } = createNamespacedHelpers('dealer')

  export default {
    name: 'BidConfigTableModel',
    props: {
      toggled: { type: Boolean, default: false },
      option: { default: [] },
      configurations: { default: [] },
      optionOrConfig: { default: () => ({}) },
      disabled: { type: Boolean, default: false }
    },
    data() {
      return {
        listing_discount_value: null,
        bucket_discount_value: null,
        listing_discount_type_value: '% Off MSRP',
        bucket_discount_type_value: '% Off MSRP',
        listing_discount_percent: null // add this line
      }
    },
    inject: ['buildConfigObject', 'computeMinPrice', 'discountValuesConst'],
    computed: {
      ...mapGetters([get.BID_CONFIG_BY_STYLE_ID]),
      componentId() {
        return this.option.year + this.option.model + 'Model'
      },
      listing_placeholder() {
        if (
          !exists(this.configurations) ||
          this.configurations
            .map(config => config.listing_discount.value)
            .every(val => !exists(val))
        )
          return 'Needs Price'
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.listing_discount_value = null
        return 'Mixed Values'
      },
      bucket_placeholder() {
        if (
          !exists(this.configurations) ||
          this.configurations
            .map(config => config.bucket_discount.value)
            .every(val => !exists(val))
        )
          return 'Needs Price'
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.bucket_discount_value = null
        return 'Mixed Values'
      },
      styles() {
        return this.option.trims.map(trim => trim.style_id)
      },
      listing_discount_type: {
        get: function () {
          return this.getDiscountType('listing_discount')
        },
        set: function (discountType) {
          if (!exists(this.listing_discount)) return
          this.setValue('listing_discount', discountType, this.listing_discount)
        }
      },
      listing_discount: {
        get: function () {
          return this.getDiscount('listing_discount')
        },
        set: function (newValue) {
          this.setValue(
            'listing_discount',
            this.listing_discount_type,
            newValue
          )
        }
      },
      bucket_discount_type: {
        get: function () {
          return this.getDiscountType('bucket_discount')
        },
        set: function (discountType) {
          if (!exists(this.bucket_discount)) return
          this.setValue('bucket_discount', discountType, this.bucket_discount)
        }
      },
      bucket_discount: {
        get: function () {
          return this.getDiscount('bucket_discount')
        },
        set: function (newValue) {
          this.setValue('bucket_discount', this.bucket_discount_type, newValue)
        }
      }
    },
    methods: {
      ...mapActions([actor.UPDATE_BID_CONFIG_BY_STYLE_ID]),
      getDiscountType(discount) {
        if (this[discount] === null) return '% Off MSRP'
        if (typeof this[discount] === 'string') return this[discount]
        return this.listing_discount_type === '% Off MSRP'
          ? 'percentage'
          : 'currency'
      },
      getDiscount(name) {
        const hasConfigs = exists(this.configurations)
        const values = this.configurations.map(config => config[name].value)
        const typeRefs = this.configurations.map(
          config => config[name].type + config[name].ref
        )
        if (
          hasConfigs &&
          values.every((val, i, arr) => val === arr[0]) &&
          typeRefs.every((val, i, arr) => val === arr[0]) &&
          values.length === this.option.trims.length
        )
          return values[0]
        return this[name + '_value']
      },
      updateConfig(value) {
        this[actor.UPDATE_BID_CONFIG_BY_STYLE_ID](value)
      },
      findConfiguration(styleId) {
        return this[get.BID_CONFIG_BY_STYLE_ID](styleId)
      },
      setValue(discount, discountType, value) {
        if (discountType === 'percentage') {
          this[discount] = null
          this.listing_discount_percent = value
        } else {
          this[discount] = value
        }
      }
    }
  }
</script>

<style scoped>
  .can-toggle {
    cursor: pointer;
  }
  select {
    background: rgba(0, 0, 0, 0);
    color: black;
    border: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
</style>
