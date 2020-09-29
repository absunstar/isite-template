app.controller("notifications", function ($scope, $http, $interval) {
  $scope._search = {};

  $scope.search = {
    bySystem: true,
    system: 'security',
    byUser: false,
    user: null,
    message: '',
    value: '',
    fromDate: null,
    toDate: null,
    limit: 50
  };


  $scope.loadSystem = function () {
    $http({
      method: "POST",
      url: "/api/system/all",
    }).then(
      function (response) {
        if (response.data) {
          $scope.systemList = response.data;
        }
      },
      function (err) {
        $scope.busy = false;
        $scope.error = err;
      }
    )

  };


  $scope.loadAll = function (where) {
    $scope.busy = true;
    $http({
      method: "POST",
      url: "/api/notifications/all",
      data: {
        where: where
      }
    }).then(
      function (response) {
        $scope.busy = false;
        if (response.data.done) {
          $scope.list = response.data.list;
        }
      },
      function (err) {
        $scope.busy = false;
        $scope.error = err;
      }
    )

  };

  $scope.loadUsers = function () {
    if ($scope.userList) {
      return
    }
    $scope.busy = true;
    $http({
      method: "POST",
      url: "/api/users/all",
      data: {}
    }).then(
      function (response) {
        $scope.busy = false;
        if (response.data.done) {
          $scope.userList = response.data.users;
        }
      },
      function (err) {
        $scope.busy = false;
        $scope.error = err;
      }
    )

  };



  $scope.searchAll = function () {
    $scope.busy = true;

    let where = {};

    if ($scope.search.source) {
      where['source.ar'] = $scope.search.source.ar;
    }

    if ($scope.search.user && $scope.search.user.id) {
      where['user.id'] = $scope.search.user.id;
    }

    if ($scope.search.message) {
      where['message.ar'] = $scope.search.message;
    }

    if ($scope.search.value) {
      where['value.ar'] =  $scope.search.value;
    }

    if ($scope.search.fromDate) {
      where['date_from'] = $scope.search.fromDate;
    }

    if ($scope.search.toDate) {
      where['date_to'] = $scope.search.toDate;
    }

    $http({
      method: "POST",
      url: "/api/notifications/all",
      data: {
        where: where,
        limit : $scope.search.limit
      }
    }).then(
      function (response) {
        $scope.busy = false;
        if (response.data.done) {
          $scope.list = response.data.list;
          site.hideModal('#searchModal');
        }
      },
      function (err) {
        $scope.busy = false;
        $scope.error = err;
      }
    )

    site.hideModal('#SearchModal')

  };


  $scope.showAdd = (n) => {
    if (n.link.collection == 'goves') {
      $scope.gov = n.add;
      site.showModal('#govDetailsModal');

    } else if (n.link.collection == 'accounts_opening_balances') {
      $scope.accounts_opening_balances = n.add;
      site.showModal('#accountsOpeningBalancesDetailsModal');

    }

    else if (n.link.collection == 'companies') {
      $scope.company = n.add;
      site.showModal('#companyDetailsModal');
      document.querySelector('#companyDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'companies_activities') {
      $scope.company_activity = n.add;
      site.showModal('#companyActivityDetailsModal');
    }

    else if (n.link.collection == 'vendors') {
      $scope.vendor = n.add;
      site.showModal('#vendorDetailsModal');
    document.querySelector('#vendorDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'vendors_group') {
      $scope.vendor_group = n.add;
      site.showModal('#vendorGroupDetailsModal');
    }

    else if (n.link.collection == 'customers') {
      $scope.customer = n.add;
      site.showModal('#customerDetailsModal');
      document.querySelector('#customerDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'customers_group') {
      $scope.customer_group = n.add;
      site.showModal('#customerGroupDetailsModal');
    }

    else if (n.link.collection == 'filesNames') {
      $scope.fileName = n.add;
      site.showModal('#fileNameDetailsModal');
    }

    else if (n.link.collection == 'nationalities') {
      $scope.nationality = n.add;
      site.showModal('#nationalityDetailsModal');
    }

    else if (n.link.collection == 'currencies') {
      $scope.currency = n.add;
      site.showModal('#currencyDetailsModal');
    }

    else if (n.link.collection == 'taxes') {
      $scope.tax = n.add;
      site.showModal('#taxDetailsModal');
    }

    else if (n.link.collection == 'sales_policies') {
      $scope.sellPolicy = n.add;
      site.showModal('#sellPolicyDetailsModal');
    }

    else if (n.link.collection == 'financial_years') {
      $scope.financial_year = n.add;
      site.showModal('#financialYearDetailsModal');
    }

    else if (n.link.collection == 'countries') {
      $scope.country = n.add;
      site.showModal('#countryDetailsModal');
    }

    else if (n.link.collection == 'cities') {
      $scope.city = n.add;
      site.showModal('#cityDetailsModal');
    }

    else if (n.link.collection == 'stores_items') {
      $scope.store_item = n.add;
      site.showModal('#storeItemDetailsModal');
    document.querySelector('#storeItemDetailsModal .tab-link').click();
    }
    
    else if (n.link.collection == 'stores_items_groups') {
      $scope.storeItemGroup = n.add;
      site.showModal('#storeItemGroupDetailsModal');
    document.querySelector('#storeItemGroupDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'items_types') {
      $scope.itemType = n.add;
      site.showModal('#itemTypeDetailsModal');
    }

    else if (n.link.collection == 'items_families') {
      $scope.itemFamily = n.add;
      site.showModal('#itemFamilyDetailsModal');
    }

    else if (n.link.collection == 'items_units') {
      $scope.itemUnit = n.add;
      site.showModal('#itemUnitDetailsModal');
    }
    else if (n.link.collection == 'items_related_units') {
      $scope.itemRelatedUnit = n.add;
      site.showModal('#itemRelatedUnitDetailsModal');
    }

    else if (n.link.collection == 'items_ranks') {
      $scope.itemRank = n.add;
      site.showModal('#itemRankDetailsModal');
    }

    else if (n.link.collection == 'stores_sections') {
      $scope.storeSection = n.add;
      site.showModal('#storeSectionDetailsModal');
    }

    else if (n.link.collection == 'warehouse_list') {
      $scope.warehouse = n.add;
      site.showModal('#warehouseDetailsModal');
      document.querySelector('#warehouseDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'stores_attributes') {
      $scope.storesAttribute = n.add;
      site.showModal('#storesAttributeDetailsModal');
    }

    else if (n.link.collection == 'services_items_groups') {
      $scope.serviceItemGroup = n.add;
      site.showModal('#serviceItemGroupDetailsModal');
    document.querySelector('#serviceItemGroupDetailsModal .tab-link').click();
    }
    else if (n.link.collection == 'services_items') {
      $scope.serviceItem = n.add;
      site.showModal('#serviceItemDetailsModal');
    document.querySelector('#serviceItemDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'inventory_request_book') {
      $scope.inventory_request_book = n.add;
      site.showModal('#inventoryRequestBookDetailsModal');
    }

    else if (n.link.collection == 'inventory_booking') {
      $scope.inventory_booking = n.add;
      site.showModal('#inventoryBookingDetailsModal');
    }

    else if (n.link.collection == 'inventory_unbooking') {
      $scope.inventory_unbooking = n.add;
      site.showModal('#inventoryUnbookingDetailsModal');
    }

    else if (n.link.collection == 'inventory_consignment_in') {
      $scope.inventory_consignment_in = n.add;
      site.showModal('#inventoryConsignmentInDetailsModal');
    }

    else if (n.link.collection == 'inventory_consignment_out') {
      $scope.inventory_consignment_out = n.add;
      site.showModal('#inventoryConsignmentOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_request') {
      $scope.inventory_stocktaking_request = n.add;
      site.showModal('#inventoryStocktakingRequestDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_registry') {
      $scope.inventory_stocktaking_registry = n.add;
      site.showModal('#inventoryStocktakingRegistryDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_merging') {
      $scope.inventory_stocktaking_merging = n.add;
      site.showModal('#inventoryStocktakingMergingDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_adjustment') {
      $scope.inventory_stocktaking_adjustment = n.add;
      site.showModal('#inventoryStocktakingAdjustmentDetailsModal');
    }

    else if (n.link.collection == 'inventory_opening_balance') {
      $scope.inventory_opening_balance = n.add;
      site.showModal('#inventoryOpeningBalanceDetailsModal');
    }

    else if (n.link.collection == 'inventory_revaluation') {
      $scope.inventory_revaluation = n.add;
      site.showModal('#inventoryRevaluationDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_in') {
      $scope.inventory_store_in = n.add;
      site.showModal('#inventoryStoreInDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_out') {
      $scope.inventory_store_out = n.add;
      site.showModal('#inventoryStoreOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_out_request') {
      $scope.inventory_store_out_request = n.add;
      site.showModal('#inventoryStoreOutRequestDetailsModal');
    }

    else if (n.link.collection == 'inventory_transfer_in') {
      $scope.inventory_transfer_in = n.add;
      site.showModal('#inventoryTransferInDetailsModal');
    }

    else if (n.link.collection == 'inventory_transfer_out') {
      $scope.inventory_transfer_out = n.add;
      site.showModal('#inventoryTransferOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_internal_transfer') {
      $scope.inventory_internal_transfer = n.add;
      site.showModal('#inventoryInternalTransferDetailsModal');
    }

    else if (n.link.collection == 'inventory_direct_transfer') {
      $scope.inventory_direct_transfer = n.add;
      site.showModal('#inventoryDirectTransferDetailsModal');
    }

    else if (n.link.collection == 'inventory_assemble_items') {
      $scope.inventoryAssembleItems = n.add;
      site.showModal('#inventoryAssembleItemsDetailsModal');
    }

    else if (n.link.collection == 'inventory_disassemble_items') {
      $scope.inventoryDisassembleItems = n.add;
      site.showModal('#inventoryDisassembleItemsDetailsModal');
    }

    else if (n.link.collection == 'inventory_damage') {
      $scope.inventory_damage = n.add;
      site.showModal('#inventoryDamageDetailsModal');
    }

    else if (n.link.collection == 'inventory_barcode_print') {
      $scope.inventory_barcode_print = n.add;
      site.showModal('#inventoryBarcodePrintDetailsModal');
    }

    else if (n.link.collection == 'guide_accounts') {
      $scope.guide_accounts = n.add;
      site.showModal('#guideAccountsDetailsModal');
    }

    else if (n.link.collection == 'cost_centers') {
      $scope.cost_centers = n.add;
      site.showModal('#costCentersDetailsModal');
    }

    else if (n.link.collection == 'guide_income_list') {
      $scope.guide_income_list = n.add;
      site.showModal('#guideIncomeListDetailsModal');
    }

    else if (n.link.collection == 'guide_budget') {
      $scope.guide_budget = n.add;
      site.showModal('#guideBudgetDetailsModal');
    }

    else if (n.link.collection == 'journal_entries') {
      $scope.journal_entries = n.add;
      site.showModal('#journalEntriesDetailsModal');
    }

    else if (n.link.collection == 'cash_definations') {
      $scope.cashDefination = n.add;
      site.showModal('#cashDefinationDetailsModal');
    }

    else if (n.link.collection == 'banks') {
      $scope.bank = n.add;
      site.showModal('#bankDetailsModal');
    }

    else if (n.link.collection == 'debentures_receipt') {
      $scope.debentures_receipt = n.add;
      site.showModal('#debenturesReceiptDetailsModal');
    }

    else if (n.link.collection == 'debentures_exchange') {
      $scope.debentures_exchange = n.add;
      site.showModal('#debenturesExchangeDetailsModal');
    }

    else if (n.link.collection == 'creditor_notes') {
      $scope.creditor_notes = n.add;
      site.showModal('#creditorNotesDetailsModal');
    }

    else if (n.link.collection == 'money_transfer') {
      $scope.money_transfer = n.add;
      site.showModal('#moneyTransferDetailsModal');
    }

    else if (n.link.collection == 'money_transfer') {
      $scope.money_transfer = n.add;
      site.showModal('#moneyTransferDetailsModal');
    }

    else if (n.link.collection == 'indebtedness_transfer') {
      $scope.indebtedness_transfer = n.add;
      site.showModal('#indebtednessTransferDetailsModal');
    }

    else if (n.link.collection == 'customers_vendors_adjustment') {
      $scope.customers_vendors_adjustment = n.add;
      site.showModal('#customersVendorsAdjustmentDetailsModal');
    }

    else if (n.link.collection == 'estimated_accounts') {
      $scope.estimated_accounts = n.add;
      site.showModal('#estimatedAccountsDetailsModal');
    }

    else if (n.link.collection == 'estimated_cost') {
      $scope.estimated_cost = n.add;
      site.showModal('#estimatedCostDetailsModal');
    }

    else if (n.link.collection == 'beneficiaries') {
      $scope.beneficiaries = n.add;
      site.showModal('#beneficiariesDetailsModal');
    }

    else if (n.link.collection == 'reasons_rejection_check') {
      $scope.reasons_rejection_check = n.add;
      site.showModal('#reasonsRejectionCheckDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.first_payment_checks = n.add;
      site.showModal('#firstPaymentChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.cashing_checks = n.add;
      site.showModal('#cashingChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.paid_check_return = n.add;
      site.showModal('#paidCheckReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.pay_check = n.add;
      site.showModal('#payCheckDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.customers_checks_return = n.add;
      site.showModal('#customersChecksReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.first_received_checks = n.add;
      site.showModal('#firstReceivedChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.receipt_checks = n.add;
      site.showModal('#receiptChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.deliver_checks = n.add;
      site.showModal('#deliverChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_deposit = n.add;
      site.showModal('#checkDepositDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_return = n.add;
      site.showModal('#checkReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_collection = n.add;
      site.showModal('#checkCollectionDetailsModal');
    }

    else if (n.link.collection == 'inventory_request_transfer') {
      $scope.inventory_request_transfer = n.add;
      site.showModal('#inventoryRequestTransferDetailsModal');
    }

    else if (n.link.collection == 'debtor_notes') {
      $scope.debtor_notes = n.add;
      site.showModal('#debtorNotesDetailsModal');
    }

    else {
      site.showModal('#displayModal');
      $('#displayContent').html(site.toHtmlTable(n.add));
    }


  };

  $scope.showUpdate = (n) => {
    if (n.link.collection == 'goves') {
      $scope.gov = n.update;
      site.showModal('#govDetailsModal');
    
    } else if (n.link.collection == 'accounts_opening_balances') {
      $scope.accounts_opening_balances = n.update;
      site.showModal('#accountsOpeningBalancesDetailsModal');

    }

    else if (n.link.collection == 'companies') {
      $scope.company = n.update;
      site.showModal('#companyDetailsModal');
      document.querySelector('#companyDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'companies_activities') {
      $scope.company_activity = n.update;
      site.showModal('#companyActivityDetailsModal');
    }

    else if (n.link.collection == 'vendors') {
      $scope.vendor = n.update;
      site.showModal('#vendorDetailsModal');
    document.querySelector('#vendorDetailsModal .tab-link').click();
    }
    
    else if (n.link.collection == 'vendors_group') {
      $scope.vendor_group = n.update;
      site.showModal('#vendorGroupDetailsModal');
    }

    else if (n.link.collection == 'customers') {
      $scope.customer = n.update;
      site.showModal('#customerDetailsModal');
      document.querySelector('#customerDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'customers_group') {
      $scope.customer_group = n.update;
      site.showModal('#customerGroupDetailsModal');
    }

    else if (n.link.collection == 'filesNames') {
      $scope.fileName = n.update;
      site.showModal('#fileNameDetailsModal');
    }

    else if (n.link.collection == 'nationalities') {
      $scope.nationality = n.update;
      site.showModal('#nationalityDetailsModal');
    }

    else if (n.link.collection == 'currencies') {
      $scope.currency = n.update;
      site.showModal('#currencyDetailsModal');
    }

    else if (n.link.collection == 'taxes') {
      $scope.tax = n.update;
      site.showModal('#taxDetailsModal');
    }

    else if (n.link.collection == 'sales_policies') {
      $scope.sellPolicy = n.update;
      site.showModal('#sellPolicyDetailsModal');
    }

    else if (n.link.collection == 'financial_years') {
      $scope.financial_year = n.update;
      site.showModal('#financialYearDetailsModal');
    }

    else if (n.link.collection == 'countries') {
      $scope.country = n.update;
      site.showModal('#countryDetailsModal');
    }

    else if (n.link.collection == 'cities') {
      $scope.city = n.update;
      site.showModal('#cityDetailsModal');
    }

    else if (n.link.collection == 'stores_items') {
      $scope.store_item = n.update;
      site.showModal('#storeItemDetailsModal');
    document.querySelector('#storeItemDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'stores_items_groups') {
      $scope.storeItemGroup = n.update;
      site.showModal('#storeItemGroupDetailsModal');
    document.querySelector('#storeItemGroupDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'items_types') {
      $scope.itemType = n.update;
      site.showModal('#itemTypeDetailsModal');
    }

    else if (n.link.collection == 'items_families') {
      $scope.itemFamily = n.update;
      site.showModal('#itemFamilyDetailsModal');
    }

    else if (n.link.collection == 'items_units') {
      $scope.itemUnit = n.update;
      site.showModal('#itemUnitDetailsModal');
    }

    else if (n.link.collection == 'items_related_units') {
      $scope.itemRelatedUnit = n.update;
      site.showModal('#itemRelatedUnitDetailsModal');
    
    }

    else if (n.link.collection == 'items_ranks') {
      $scope.itemRank = n.update;
      site.showModal('#itemRankDetailsModal');
    }
    else if (n.link.collection == 'stores_sections') {
      $scope.storeSection = n.update;
      site.showModal('#storeSectionDetailsModal');
    }

    else if (n.link.collection == 'warehouse_list') {
      $scope.warehouse = n.update;
      site.showModal('#warehouseDetailsModal');
      document.querySelector('#warehouseDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'stores_attributes') {
      $scope.storesAttribute = n.update;
      site.showModal('#storesAttributeDetailsModal');
    }

    else if (n.link.collection == 'services_items_groups') {
      $scope.serviceItemGroup = n.update;
      site.showModal('#serviceItemGroupDetailsModal');
    document.querySelector('#serviceItemGroupDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'services_items') {
      $scope.serviceItem = n.update;
      site.showModal('#serviceItemDetailsModal');
    document.querySelector('#serviceItemDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'inventory_request_book') {
      $scope.inventory_request_book = n.update;
      site.showModal('#inventoryRequestBookDetailsModal');
    }

    else if (n.link.collection == 'inventory_booking') {
      $scope.inventory_booking = n.update;
      site.showModal('#inventoryBookingDetailsModal');
    }

    else if (n.link.collection == 'inventory_unbooking') {
      $scope.inventory_unbooking = n.update;
      site.showModal('#inventoryUnbookingDetailsModal');
    }

    else if (n.link.collection == 'inventory_consignment_in') {
      $scope.inventory_consignment_in = n.update;
      site.showModal('#inventoryConsignmentInDetailsModal');
    }

    else if (n.link.collection == 'inventory_consignment_out') {
      $scope.inventory_consignment_out = n.update;
      site.showModal('#inventoryConsignmentOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_request') {
      $scope.inventory_stocktaking_request = n.update;
      site.showModal('#inventoryStocktakingRequestDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_registry') {
      $scope.inventory_stocktaking_registry = n.update;
      site.showModal('#inventoryStocktakingRegistryDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_merging') {
      $scope.inventory_stocktaking_merging = n.update;
      site.showModal('#inventoryStocktakingMergingDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_adjustment') {
      $scope.inventory_stocktaking_adjustment = n.update;
      site.showModal('#inventoryStocktakingAdjustmentDetailsModal');
    }

    else if (n.link.collection == 'inventory_opening_balance') {
      $scope.inventory_opening_balance = n.update;
      site.showModal('#inventoryOpeningBalanceDetailsModal');
    }

    else if (n.link.collection == 'inventory_revaluation') {
      $scope.inventory_revaluation = n.update;
      site.showModal('#inventoryRevaluationDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_in') {
      $scope.inventory_store_in = n.update;
      site.showModal('#inventoryStoreInDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_out') {
      $scope.inventory_store_out = n.update;
      site.showModal('#inventoryStoreOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_out_request') {
      $scope.inventory_store_out_request = n.update;
      site.showModal('#inventoryStoreOutRequestDetailsModal');
    }

    else if (n.link.collection == 'inventory_transfer_in') {
      $scope.inventory_transfer_in = n.update;
      site.showModal('#inventoryTransferInDetailsModal');
    }

    else if (n.link.collection == 'inventory_transfer_out') {
      $scope.inventory_transfer_out = n.update;
      site.showModal('#inventoryTransferOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_internal_transfer') {
      $scope.inventory_internal_transfer = n.update;
      site.showModal('#inventoryInternalTransferDetailsModal');
    }

    else if (n.link.collection == 'inventory_direct_transfer') {
      $scope.inventory_direct_transfer = n.update;
      site.showModal('#inventoryDirectTransferDetailsModal');
    }

    else if (n.link.collection == 'inventory_assemble_items') {
      $scope.inventoryAssembleItems = n.update;
      site.showModal('#inventoryAssembleItemsDetailsModal');
    }

    else if (n.link.collection == 'inventory_disassemble_items') {
      $scope.inventoryDisassembleItems = n.update;
      site.showModal('#inventoryDisassembleItemsDetailsModal');
    }

    else if (n.link.collection == 'inventory_damage') {
      $scope.inventory_damage = n.update;
      site.showModal('#inventoryDamageDetailsModal');
    }

    else if (n.link.collection == 'inventory_barcode_print') {
      $scope.inventory_barcode_print = n.update;
      site.showModal('#inventoryBarcodePrintDetailsModal');
    }

    else if (n.link.collection == 'guide_accounts') {
      $scope.guide_accounts = n.update;
      site.showModal('#guideAccountsDetailsModal');
    }

 else if (n.link.collection == 'cost_centers') {
      $scope.cost_centers = n.update;
      site.showModal('#costCentersDetailsModal');
    }

    else if (n.link.collection == 'guide_income_list') {
      $scope.guide_income_list = n.update;
      site.showModal('#guideIncomeListDetailsModal');
    }

    else if (n.link.collection == 'guide_budget') {
      $scope.guide_budget = n.update;
      site.showModal('#guideBudgetDetailsModal');
    }

    else if (n.link.collection == 'journal_entries') {
      $scope.journal_entries = n.update;
      site.showModal('#journalEntriesDetailsModal');
    }

    else if (n.link.collection == 'cash_definations') {
      $scope.cashDefination = n.update;
      site.showModal('#cashDefinationDetailsModal');
    }

    else if (n.link.collection == 'banks') {
      $scope.bank = n.update;
      site.showModal('#bankDetailsModal');
    }

    else if (n.link.collection == 'debentures_receipt') {
      $scope.debentures_receipt = n.update;
      site.showModal('#debenturesReceiptDetailsModal');
    }

    else if (n.link.collection == 'debentures_exchange') {
      $scope.debentures_exchange = n.update;
      site.showModal('#debenturesExchangeDetailsModal');
    }

    else if (n.link.collection == 'creditor_notes') {
      $scope.creditor_notes = n.update;
      site.showModal('#creditorNotesDetailsModal');
    }

    else if (n.link.collection == 'money_transfer') {
      $scope.money_transfer = n.update;
      site.showModal('#moneyTransferDetailsModal');
    }

    else if (n.link.collection == 'indebtedness_transfer') {
      $scope.indebtedness_transfer = n.update;
      site.showModal('#indebtednessTransferDetailsModal');
    }
    
    else if (n.link.collection == 'customers_vendors_adjustment') {
      $scope.customers_vendors_adjustment = n.update;
      site.showModal('#customersVendorsAdjustmentDetailsModal');
    }

    else if (n.link.collection == 'estimated_accounts') {
      $scope.estimated_accounts = n.update;
      site.showModal('#estimatedAccountsDetailsModal');
    }

    else if (n.link.collection == 'estimated_cost') {
      $scope.estimated_cost = n.update;
      site.showModal('#estimatedCostDetailsModal');
    }

    else if (n.link.collection == 'beneficiaries') {
      $scope.beneficiaries = n.update;
      site.showModal('#beneficiariesDetailsModal');
    }

    else if (n.link.collection == 'reasons_rejection_check') {
      $scope.reasons_rejection_check = n.update;
      site.showModal('#reasonsRejectionCheckDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.first_payment_checks = n.update;
      site.showModal('#firstPaymentChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.cashing_checks = n.update;
      site.showModal('#cashingChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.paid_check_return = n.update;
      site.showModal('#paidCheckReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.pay_check = n.update;
      site.showModal('#payCheckDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.customers_checks_return = n.update;
      site.showModal('#customersChecksReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.first_received_checks = n.update;
      site.showModal('#firstReceivedChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.receipt_checks = n.update;
      site.showModal('#receiptChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.deliver_checks = n.update;
      site.showModal('#deliverChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_deposit = n.update;
      site.showModal('#checkDepositDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_return = n.update;
      site.showModal('#checkReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_collection = n.update;
      site.showModal('#checkCollectionDetailsModal');
    }

    else if (n.link.collection == 'inventory_request_transfer') {
      $scope.inventory_request_transfer = n.update;
      site.showModal('#inventoryRequestTransferDetailsModal');
    }

    else if (n.link.collection == 'debtor_notes') {
      $scope.debtor_notes = n.update;
      site.showModal('#debtorNotesDetailsModal');
    }

    else {
      site.showModal('#displayModal')
      $('#displayContent').html(site.toHtmlTable(n.update));
    }


   

  };

  $scope.showDelete = (n) => {
    if (n.link.collection == 'goves') {
      $scope.gov = n.delete;
      site.showModal('#govDetailsModal');

    } else if (n.link.collection == 'accounts_opening_balances') {
      $scope.accounts_opening_balances = n.delete;
      site.showModal('#accountsOpeningBalancesDetailsModal');

    }

    else if (n.link.collection == 'companies') {
      $scope.company = n.delete;
      site.showModal('#companyDetailsModal');
      document.querySelector('#companyDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'companies_activities') {
      $scope.company_activity = n.delete;
      site.showModal('#companyActivityDetailsModal');
    }
    else if (n.link.collection == 'vendors') {
      $scope.vendor = n.delete;
      site.showModal('#vendorDetailsModal');
    document.querySelector('#vendorDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'vendors_group') {
      $scope.vendor_group = n.delete;
      site.showModal('#vendorGroupDetailsModal');
    }

    else if (n.link.collection == 'customers') {
      $scope.customer = n.delete;
      site.showModal('#customerDetailsModal');
      document.querySelector('#customerDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'filesNames') {
      $scope.fileName = n.delete;
      site.showModal('#fileNameDetailsModal');
    }

    else if (n.link.collection == 'nationalities') {
      $scope.nationality = n.delete;
      site.showModal('#nationalityDetailsModal');
    }

    else if (n.link.collection == 'customers_group') {
      $scope.customer_group = n.delete;
      site.showModal('#customerGroupDetailsModal');
    }

    else if (n.link.collection == 'currencies') {
      $scope.currency = n.delete;
      site.showModal('#currencyDetailsModal');
    }

    else if (n.link.collection == 'taxes') {
      $scope.tax = n.delete;
      site.showModal('#taxDetailsModal');
    }

    else if (n.link.collection == 'sales_policies') {
      $scope.sellPolicy = n.delete;
      site.showModal('#sellPolicyDetailsModal');
    }

    else if (n.link.collection == 'financial_years') {
      $scope.financial_year = n.delete;
      site.showModal('#financialYearDetailsModal');
    }

    else if (n.link.collection == 'countries') {
      $scope.country = n.delete;
      site.showModal('#countryDetailsModal');
    }

    else if (n.link.collection == 'stores_items') {
      $scope.store_item = n.delete;
      site.showModal('#storeItemDetailsModal');
    document.querySelector('#storeItemDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'stores_items_groups') {
      $scope.storeItemGroup = n.delete;
      site.showModal('#storeItemGroupDetailsModal');
    document.querySelector('#storeItemGroupDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'cities') {
      $scope.city = n.delete;
      site.showModal('#cityDetailsModal');
    }
    else if (n.link.collection == 'items_types') {
      $scope.itemType = n.delete;
      site.showModal('#itemTypeDetailsModal');
    }

    else if (n.link.collection == 'items_families') {
      $scope.itemFamily = n.delete;
      site.showModal('#itemFamilyDetailsModal');
    }

    else if (n.link.collection == 'items_units') {
      $scope.itemUnit = n.delete;
      site.showModal('#itemUnitDetailsModal');
    }

    else if (n.link.collection == 'items_related_units') {
      $scope.itemRelatedUnit = n.delete;
      site.showModal('#itemRelatedUnitDetailsModal');
    
    }

    else if (n.link.collection == 'items_ranks') {
      $scope.itemRank = n.delete;
      site.showModal('#itemRankDetailsModal');
    }

    else if (n.link.collection == 'stores_sections') {
      $scope.storeSection = n.delete;
      site.showModal('#storeSectionDetailsModal');
    }

    else if (n.link.collection == 'warehouse_list') {
      $scope.warehouse = n.delete;
      site.showModal('#warehouseDetailsModal');
      document.querySelector('#warehouseDetailsModal .tab-link').click();
    }
    else if (n.link.collection == 'stores_attributes') {
      $scope.storesAttribute = n.delete;
      site.showModal('#storesAttributeDetailsModal');
    }

    else if (n.link.collection == 'services_items_groups') {
      $scope.serviceItemGroup = n.delete;
      site.showModal('#serviceItemGroupDetailsModal');
    document.querySelector('#serviceItemGroupDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'services_items') {
      $scope.serviceItem = n.delete;
      site.showModal('#serviceItemDetailsModal');
    document.querySelector('#serviceItemDetailsModal .tab-link').click();
    }

    else if (n.link.collection == 'inventory_request_book') {
      $scope.inventory_request_book = n.delete;
      site.showModal('#inventoryRequestBookDetailsModal');
    }

    else if (n.link.collection == 'inventory_unbooking') {
      $scope.inventory_unbooking = n.delete;
      site.showModal('#inventoryUnbookingDetailsModal');
    }

    else if (n.link.collection == 'inventory_consignment_in') {
      $scope.inventory_consignment_in = n.delete;
      site.showModal('#inventoryConsignmentInDetailsModal');
    }

    else if (n.link.collection == 'inventory_consignment_out') {
      $scope.inventory_consignment_out = n.delete;
      site.showModal('#inventoryConsignmentOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_booking') {
      $scope.inventory_booking = n.delete;
      site.showModal('#inventoryBookingDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_request') {
      $scope.inventory_stocktaking_request = n.delete;
      site.showModal('#inventoryStocktakingRequestDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_registry') {
      $scope.inventory_stocktaking_registry = n.delete;
      site.showModal('#inventoryStocktakingRegistryDetailsModal');
    }

    else if (n.link.collection == 'inventory_stocktaking_merging') {
      $scope.inventory_stocktaking_merging = n.delete;
      site.showModal('#inventoryStocktakingMergingDetailsModal');
    }
    
    else if (n.link.collection == 'inventory_stocktaking_adjustment') {
      $scope.inventory_stocktaking_adjustment = n.delete;
      site.showModal('#inventoryStocktakingAdjustmentDetailsModal');
    }

    else if (n.link.collection == 'inventory_opening_balance') {
      $scope.inventory_opening_balance = n.delete;
      site.showModal('#inventoryOpeningBalanceDetailsModal');
    }

    else if (n.link.collection == 'inventory_revaluation') {
      $scope.inventory_revaluation = n.delete;
      site.showModal('#inventoryRevaluationDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_in') {
      $scope.inventory_store_in = n.delete;
      site.showModal('#inventoryStoreInDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_out') {
      $scope.inventory_store_out = n.delete;
      site.showModal('#inventoryStoreOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_store_out_request') {
      $scope.inventory_store_out_request = n.delete;
      site.showModal('#inventoryStoreOutRequestDetailsModal');
    }
    
    else if (n.link.collection == 'inventory_transfer_in') {
      $scope.inventory_transfer_in = n.delete;
      site.showModal('#inventoryTransferInDetailsModal');
    }

    else if (n.link.collection == 'inventory_transfer_out') {
      $scope.inventory_transfer_out = n.delete;
      site.showModal('#inventoryTransferOutDetailsModal');
    }

    else if (n.link.collection == 'inventory_internal_transfer') {
      $scope.inventory_internal_transfer = n.delete;
      site.showModal('#inventoryInternalTransferDetailsModal');
    }

    else if (n.link.collection == 'inventory_direct_transfer') {
      $scope.inventory_direct_transfer = n.delete;
      site.showModal('#inventoryDirectTransferDetailsModal');
    }

    else if (n.link.collection == 'inventory_assemble_items') {
      $scope.inventoryAssembleItems = n.delete;
      site.showModal('#inventoryAssembleItemsDetailsModal');
    }

    else if (n.link.collection == 'inventory_disassemble_items') {
      $scope.inventoryDisassembleItems = n.delete;
      site.showModal('#inventoryDisassembleItemsDetailsModal');
    }

    else if (n.link.collection == 'inventory_damage') {
      $scope.inventory_damage = n.delete;
      site.showModal('#inventoryDamageDetailsModal');
    }

    else if (n.link.collection == 'inventory_barcode_print') {
      $scope.inventory_barcode_print = n.delete;
      site.showModal('#inventoryBarcodePrintDetailsModal');
    }

    else if (n.link.collection == 'guide_accounts') {
      $scope.guide_accounts = n.delete;
      site.showModal('#guideAccountsDetailsModal');
    }

    else if (n.link.collection == 'cost_centers') {
      $scope.cost_centers = n.delete;
      site.showModal('#costCentersDetailsModal');
    }

    else if (n.link.collection == 'guide_income_list') {
      $scope.guide_income_list = n.delete;
      site.showModal('#guideIncomeListDetailsModal');
    }

    else if (n.link.collection == 'guide_budget') {
      $scope.guide_budget = n.delete;
      site.showModal('#guideBudgetDetailsModal');
    }

    else if (n.link.collection == 'journal_entries') {
      $scope.journal_entries = n.delete;
      site.showModal('#journalEntriesDetailsModal');
    }

    else if (n.link.collection == 'cash_definations') {
      $scope.cashDefination = n.delete;
      site.showModal('#cashDefinationDetailsModal');
    }

    else if (n.link.collection == 'banks') {
      $scope.bank = n.delete;
      site.showModal('#bankDetailsModal');
    }

    else if (n.link.collection == 'debentures_receipt') {
      $scope.debentures_receipt = n.delete;
      site.showModal('#debenturesReceiptDetailsModal');
    }

    else if (n.link.collection == 'debentures_exchange') {
      $scope.debentures_exchange = n.delete;
      site.showModal('#debenturesExchangeDetailsModal');
    }

    else if (n.link.collection == 'creditor_notes') {
      $scope.creditor_notes = n.delete;
      site.showModal('#creditorNotesDetailsModal');
    }

    else if (n.link.collection == 'debtor_notes') {
      $scope.debtor_notes = n.delete;
      site.showModal('#debtorNotesDetailsModal');
    }

    else if (n.link.collection == 'money_transfer') {
      $scope.money_transfer = n.delete;
      site.showModal('#moneyTransferDetailsModal');
    }

    else if (n.link.collection == 'indebtedness_transfer') {
      $scope.indebtedness_transfer = n.delete;
      site.showModal('#indebtednessTransferDetailsModal');
    }

    else if (n.link.collection == 'customers_vendors_adjustment') {
      $scope.customers_vendors_adjustment = n.delete;
      site.showModal('#customersVendorsAdjustmentDetailsModal');
    }

    else if (n.link.collection == 'estimated_accounts') {
      $scope.estimated_accounts = n.delete;
      site.showModal('#estimatedAccountsDetailsModal');
    }

    else if (n.link.collection == 'estimated_cost') {
      $scope.estimated_cost = n.delete;
      site.showModal('#estimatedCostDetailsModal');
    }

    else if (n.link.collection == 'beneficiaries') {
      $scope.beneficiaries = n.delete;
      site.showModal('#beneficiariesDetailsModal');
    }

    else if (n.link.collection == 'reasons_rejection_check') {
      $scope.reasons_rejection_check = n.delete;
      site.showModal('#reasonsRejectionCheckDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.first_payment_checks = n.delete;
      site.showModal('#firstPaymentChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.cashing_checks = n.delete;
      site.showModal('#cashingChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.paid_check_return = n.delete;
      site.showModal('#paidCheckReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.pay_check = n.delete;
      site.showModal('#payCheckDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.customers_checks_return = n.delete;
      site.showModal('#customersChecksReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.first_received_checks = n.delete;
      site.showModal('#firstReceivedChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.receipt_checks = n.delete;
      site.showModal('#receiptChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.deliver_checks = n.delete;
      site.showModal('#deliverChecksDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_deposit = n.delete;
      site.showModal('#checkDepositDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_return = n.delete;
      site.showModal('#checkReturnDetailsModal');
    }

    else if (n.link.collection == 'checks') {
      $scope.check_collection = n.delete;
      site.showModal('#checkCollectionDetailsModal');
    }

    else if (n.link.collection == 'inventory_request_transfer') {
      $scope.inventory_request_transfer = n.delete;
      site.showModal('#inventoryRequestTransferDetailsModal');
    }

  };


  $scope.loadAll();
  $scope.loadUsers();
  $scope.loadSystem();

});