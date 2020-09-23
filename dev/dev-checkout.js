const checkout = {
  id:
    "Z2lkOi8vc2hvcGlmeS9DaGVja291dC82YzBkZmRkZGY2YjE3MzQ0OTYyZjgxNDIwMTQwZGI0Yj9rZXk9NzYwZWE2YzQ4NTcxZTc1MmJjMzgwNmEwOGY2YWQ0MWU=",
  ready: true,
  requiresShipping: true,
  note: null,
  paymentDue: "125.00",
  paymentDueV2: {
    amount: "125.0",
    currencyCode: "USD",
    type: {
      name: "MoneyV2",
      kind: "OBJECT",
      fieldBaseTypes: { amount: "Decimal", currencyCode: "CurrencyCode" },
      implementsNode: false
    }
  },
  webUrl:
    "https://miaouxx.myshopify.com/12311148/checkouts/6c0dfdddf6b17344962f81420140db4b?key=760ea6c48571e752bc3806a08f6ad41e",
  orderStatusUrl: null,
  taxExempt: false,
  taxesIncluded: false,
  currencyCode: "USD",
  totalTax: "0.00",
  totalTaxV2: {
    amount: "0.0",
    currencyCode: "USD",
    type: {
      name: "MoneyV2",
      kind: "OBJECT",
      fieldBaseTypes: { amount: "Decimal", currencyCode: "CurrencyCode" },
      implementsNode: false
    }
  },
  lineItemsSubtotalPrice: {
    amount: "125.0",
    currencyCode: "USD",
    type: {
      name: "MoneyV2",
      kind: "OBJECT",
      fieldBaseTypes: { amount: "Decimal", currencyCode: "CurrencyCode" },
      implementsNode: false
    }
  },
  subtotalPrice: "125.00",
  subtotalPriceV2: {
    amount: "125.0",
    currencyCode: "USD",
    type: {
      name: "MoneyV2",
      kind: "OBJECT",
      fieldBaseTypes: { amount: "Decimal", currencyCode: "CurrencyCode" },
      implementsNode: false
    }
  },
  totalPrice: "125.00",
  totalPriceV2: {
    amount: "125.0",
    currencyCode: "USD",
    type: {
      name: "MoneyV2",
      kind: "OBJECT",
      fieldBaseTypes: { amount: "Decimal", currencyCode: "CurrencyCode" },
      implementsNode: false
    }
  },
  completedAt: null,
  createdAt: "2020-09-23T19:44:40Z",
  updatedAt: "2020-09-23T19:44:41Z",
  email: null,
  discountApplications: [],
  appliedGiftCards: [],
  shippingAddress: null,
  shippingLine: null,
  customAttributes: [
    {
      key: "",
      value: "",
      type: {
        name: "Attribute",
        kind: "OBJECT",
        fieldBaseTypes: { key: "String", value: "String" },
        implementsNode: false
      }
    }
  ],
  order: null,
  lineItems: [
    {
      id:
        "Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzMyMDUyNzc3NTgyNjk3MD9jaGVja291dD02YzBkZmRkZGY2YjE3MzQ0OTYyZjgxNDIwMTQwZGI0Yg==",
      title: "MINI MONI SKIRT - ART NOUVEAU",
      variant: {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjA1Mjc3NzU4MjY5Nw==",
        title: "ANF / XL",
        price: "125.00",
        priceV2: {
          amount: "125.0",
          currencyCode: "USD",
          type: {
            name: "MoneyV2",
            kind: "OBJECT",
            fieldBaseTypes: { amount: "Decimal", currencyCode: "CurrencyCode" },
            implementsNode: false
          }
        },
        presentmentPrices: [
          {
            price: {
              amount: "125.0",
              currencyCode: "USD",
              type: {
                name: "MoneyV2",
                kind: "OBJECT",
                fieldBaseTypes: {
                  amount: "Decimal",
                  currencyCode: "CurrencyCode"
                },
                implementsNode: false
              }
            },
            compareAtPrice: null,
            type: {
              name: "ProductVariantPricePair",
              kind: "OBJECT",
              fieldBaseTypes: { compareAtPrice: "MoneyV2", price: "MoneyV2" },
              implementsNode: false
            },
            nextPageQueryAndPath: {
              _custom: { type: "function", display: "<span>ƒ</span> ()" }
            },
            hasNextPage: false,
            hasPreviousPage: false,
            variableValues: {
              checkoutId:
                "Z2lkOi8vc2hvcGlmeS9DaGVja291dC82YzBkZmRkZGY2YjE3MzQ0OTYyZjgxNDIwMTQwZGI0Yj9rZXk9NzYwZWE2YzQ4NTcxZTc1MmJjMzgwNmEwOGY2YWQ0MWU=",
              lineItems: {
                variantId:
                  "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjA1Mjc3NzU4MjY5Nw==",
                quantity: 1,
                customAttributes: [{ key: "", value: "" }]
              }
            }
          }
        ],
        weight: 2,
        available: false,
        sku: "4007-CLANFXL",
        compareAtPrice: null,
        compareAtPriceV2: null,
        image: {
          id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTUzMTEyNDU1NDE0ODE=",
          src:
            "https://cdn.shopify.com/s/files/1/1231/1148/products/alex330-424.jpg?v=1592811268",
          altText: null,
          type: {
            name: "Image",
            kind: "OBJECT",
            fieldBaseTypes: {
              altText: "String",
              id: "ID",
              originalSrc: "URL",
              src: "URL"
            },
            implementsNode: false
          }
        },
        selectedOptions: [
          {
            name: "Color",
            value: "ANF",
            type: {
              name: "SelectedOption",
              kind: "OBJECT",
              fieldBaseTypes: { name: "String", value: "String" },
              implementsNode: false
            }
          },
          {
            name: "Size",
            value: "XL",
            type: {
              name: "SelectedOption",
              kind: "OBJECT",
              fieldBaseTypes: { name: "String", value: "String" },
              implementsNode: false
            }
          }
        ],
        unitPrice: null,
        unitPriceMeasurement: {
          measuredType: null,
          quantityUnit: null,
          quantityValue: 0,
          referenceUnit: null,
          referenceValue: 0,
          type: {
            name: "UnitPriceMeasurement",
            kind: "OBJECT",
            fieldBaseTypes: {
              measuredType: "UnitPriceMeasurementMeasuredType",
              quantityUnit: "UnitPriceMeasurementMeasuredUnit",
              quantityValue: "Float",
              referenceUnit: "UnitPriceMeasurementMeasuredUnit",
              referenceValue: "Int"
            },
            implementsNode: false
          }
        },
        product: {
          id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1NTgyODM5NjQ1MjE=",
          handle: "4007-cl-2",
          refetchQuery: {
            _custom: { type: "function", display: "<span>ƒ</span> ()" }
          },
          type: {
            name: "Product",
            kind: "OBJECT",
            fieldBaseTypes: {
              availableForSale: "Boolean",
              createdAt: "DateTime",
              description: "String",
              descriptionHtml: "HTML",
              handle: "String",
              id: "ID",
              images: "ImageConnection",
              onlineStoreUrl: "URL",
              options: "ProductOption",
              productType: "String",
              publishedAt: "DateTime",
              title: "String",
              updatedAt: "DateTime",
              variants: "ProductVariantConnection",
              vendor: "String"
            },
            implementsNode: true
          }
        },
        refetchQuery: {
          _custom: { type: "function", display: "<span>ƒ</span> ()" }
        },
        type: {
          name: "ProductVariant",
          kind: "OBJECT",
          fieldBaseTypes: {
            availableForSale: "Boolean",
            compareAtPrice: "Money",
            compareAtPriceV2: "MoneyV2",
            id: "ID",
            image: "Image",
            presentmentPrices: "ProductVariantPricePairConnection",
            price: "Money",
            priceV2: "MoneyV2",
            product: "Product",
            selectedOptions: "SelectedOption",
            sku: "String",
            title: "String",
            unitPrice: "MoneyV2",
            unitPriceMeasurement: "UnitPriceMeasurement",
            weight: "Float"
          },
          implementsNode: true
        }
      },
      quantity: 1,
      customAttributes: [
        {
          key: "",
          value: "",
          type: {
            name: "Attribute",
            kind: "OBJECT",
            fieldBaseTypes: { key: "String", value: "String" },
            implementsNode: false
          }
        }
      ],
      discountAllocations: [],
      refetchQuery: {
        _custom: { type: "function", display: "<span>ƒ</span> ()" }
      },
      type: {
        name: "CheckoutLineItem",
        kind: "OBJECT",
        fieldBaseTypes: {
          customAttributes: "Attribute",
          discountAllocations: "DiscountAllocation",
          id: "ID",
          quantity: "Int",
          title: "String",
          variant: "ProductVariant"
        },
        implementsNode: true
      },
      nextPageQueryAndPath: {
        _custom: { type: "function", display: "<span>ƒ</span> ()" }
      },
      hasNextPage: false,
      hasPreviousPage: false,
      variableValues: {
        checkoutId:
          "Z2lkOi8vc2hvcGlmeS9DaGVja291dC82YzBkZmRkZGY2YjE3MzQ0OTYyZjgxNDIwMTQwZGI0Yj9rZXk9NzYwZWE2YzQ4NTcxZTc1MmJjMzgwNmEwOGY2YWQ0MWU=",
        lineItems: {
          variantId:
            "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjA1Mjc3NzU4MjY5Nw==",
          quantity: 1,
          customAttributes: [{ key: "", value: "" }]
        }
      }
    }
  ],
  refetchQuery: { _custom: { type: "function", display: "<span>ƒ</span> ()" } },
  type: {
    name: "Checkout",
    kind: "OBJECT",
    fieldBaseTypes: {
      appliedGiftCards: "AppliedGiftCard",
      completedAt: "DateTime",
      createdAt: "DateTime",
      currencyCode: "CurrencyCode",
      customAttributes: "Attribute",
      discountApplications: "DiscountApplicationConnection",
      email: "String",
      id: "ID",
      lineItems: "CheckoutLineItemConnection",
      lineItemsSubtotalPrice: "MoneyV2",
      note: "String",
      order: "Order",
      orderStatusUrl: "URL",
      paymentDue: "Money",
      paymentDueV2: "MoneyV2",
      ready: "Boolean",
      requiresShipping: "Boolean",
      shippingAddress: "MailingAddress",
      shippingLine: "ShippingRate",
      subtotalPrice: "Money",
      subtotalPriceV2: "MoneyV2",
      taxExempt: "Boolean",
      taxesIncluded: "Boolean",
      totalPrice: "Money",
      totalPriceV2: "MoneyV2",
      totalTax: "Money",
      totalTaxV2: "MoneyV2",
      updatedAt: "DateTime",
      webUrl: "URL"
    },
    implementsNode: true
  },
  errors: "__vue_devtool_undefined__",
  userErrors: []
};

export default checkout;
