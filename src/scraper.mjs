import chalk from 'chalk';
import "dotenv/config";
import puppeteer from "puppeteer";
const url = "https://eservices.capetown.gov.za/irj/portal";

export const submitElectricityReading = async (number) => {
  if (Number.isNaN(number))
    throw new Error("Can not submit NaN as electricity reading");

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: 'new'});
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);

  // Set screen size to 1920x1080
  await page.setViewport({ width: 1920, height: 1080 });

  // Type into the login box
  await page.type("#logonuidfield", process.env.COCT_USERNAME);
  await page.type("#logonpassfield", process.env.COCT_PASSWORD);

  // Wait and click on first result
  // <input class="urBtnStdNew" type="submit" name="uidPasswordLogon" value="Log On">
  await page.click('input[name="uidPasswordLogon"]');

  // await page.waitForTimeout(1000);

  // Wait for the following element to appear on the screen
  // <div id="tabIndex1" displayname="Municipal accounts" title="Municipal accounts" toptabindex="1" isdrag="1" style="width: 126px;" onmouseout="if(TLN_AFP_IVIEW.selected_tab!=this){TLN_AFP_IVIEW.tabStandard(this.id);}" onmouseover="TLN_AFP_IVIEW.tabHover(this.id);" class="TabWorkCenter_SmallTabs TabBottomBorder TabStandard" tabindex="0" length="6" savedclientwidth="126" fixedtitle="Municipal accounts" isselected="false" dragobj="0" curcont="0"><div id="tabDown1" class="TabDownForSubContainer" style="margin-top: -1px; display: none; height: 45px; width: 133px;"><table dir="ltr" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td class="TabDownForSub00_SmallTabs" nowrap="nowrap"><img src="/com.sap.portal.navigation.afp.tln/images/blank.gif" alt="" style="width:1px;"></td><td class="TabDownForSub10_SmallTabs" width="100%" nowrap="nowrap"><img src="/com.sap.portal.navigation.afp.tln/images/blank.gif" alt="" style="width:1px;"></td><td class="TabDownForSub20_SmallTabs" nowrap="nowrap"><img src="/com.sap.portal.navigation.afp.tln/images/blank.gif" alt="" style="width:1px;"></td></tr><tr><td class="TabDownForSub01_SmallTabs" height="100%" nowrap="nowrap"><img src="/com.sap.portal.navigation.afp.tln/images/blank.gif" alt="" style="width:1px;"></td><td class="TabDownForSub11_SmallTabs" height="3px" nowrap="nowrap"><img src="/com.sap.portal.navigation.afp.tln/images/blank.gif" alt="" style="width:1px;"></td><td class="TabDownForSub21_SmallTabs" nowrap="nowrap"><img src="/com.sap.portal.navigation.afp.tln/images/blank.gif" alt="" style="width:1px;"></td></tr></tbody></table></div><div class="Icon_TitleContainer"><div id="tabIcon1" class="WorkcenterStandard_SmallTabs"></div><div class="TabText_SmallTabs" nowrap="nowrap" style="white-space:nowrap">Municipal accounts</div></div><div id="tabSeperator1" class="Separator_SmallTabs TabBottomBorder"></div><div style="display:none;" id="navurl://dfd4114629d3ea651afdacc681c5582e" level="1"></div></div>
  await page.waitForSelector("#tabIndex1");
  await page.click("#tabIndex1");

  // Wait for the following element to appear on the screen
  // <div id="L2N3" title="Enter meter readings" nodename="navurl://059ae7f66da3fafe6cd7a59ebd6da3ee" class="TreeText TreeTextStandard" style="padding:5px 0px 4px 19px;" onmouseover="if(DTN_CNP_IVIEW.selected_node!=this) DTN_CNP_IVIEW.hoverDtnNodeRow(this, true); DTN_CNP_IVIEW.checkHorizontalScrolling(this);" onmouseout="if(DTN_CNP_IVIEW.selected_node!=this) DTN_CNP_IVIEW.normalDtnNodeRow(this, true); DTN_CNP_IVIEW.checkHorizontalScrolling(this);" tabindex="0" nodeindex="3" haschildren="false" nodetitle="Enter meter readings" arrowid="ARROWL2N3" level="2" isnavzoom="false" nodeid="navurl://059ae7f66da3fafe6cd7a59ebd6da3ee" isselected="false"><span class="IconBullet textIcon">&nbsp;</span><span hoverclass="NaviTreeTitleTextDownHoverState" downclass="NaviTreeTitleTextDownHoverState" class="null">Enter meter readings</span></div>
  // Select it based on title, not id, because the id changes every time
  await page.waitForSelector('div[title="Enter meter readings"]');
  await page.click('div[title="Enter meter readings"]');

  // Wait for the content area iframe to appear on the screen
  await page.waitForSelector("#contentAreaFrame");
  const iframeContentAreaElement = await page.$("#contentAreaFrame");
  const frameContentArea = await iframeContentAreaElement.contentFrame();


  // Wait for the iframe to appear on the screen
  await frameContentArea.waitForSelector("#ivuFrm_page0ivu1");
  const iframeElement = await frameContentArea.$("#ivuFrm_page0ivu1");
  const frame = await iframeElement.contentFrame();
  await frame.waitForNavigation();
  await frame.waitForTimeout(1000);

  // Wait for account link inside iframe and click on it
  let accountIndex = parseInt(process.env.COCT_ACCOUNT_INDEX) || 0;
  await frame.waitForSelector(`a[href="accswitch.sap?accselect=${accountIndex}"]`);
  await frame.click(`a[href="accswitch.sap?accselect=${accountIndex}"]`);
  
  // Wait for form to load
  await frame.waitForSelector(`#meter\\.PRE_NUMBER0`);
  await frame.waitForSelector(`#meter\\.SUC_NUMBER0`);

  // Now we're in the place where we need to enter the numbers...
  const [integerPart, decimalPart] = number.toString().split(".");

  await frame.evaluate(() => {
    document.querySelector("#meter\\.PRE_NUMBER0").removeAttribute("disabled");
    document.querySelector("#meter\\.SUC_NUMBER0").removeAttribute("disabled");
    document.querySelector("#meter\\.PRE_NUMBER0").classList.remove("disabled");
    document.querySelector("#meter\\.SUC_NUMBER0").classList.remove("disabled");
  });

  // Type the values into the fields
  await frame.type("#meter\\.PRE_NUMBER0", integerPart.slice(-5)); // Eservices only allow last 5 digits
  await frame.type("#meter\\.SUC_NUMBER0", decimalPart);

  // Proceed to summary page
  await frame.click(`input#next`);

  // Wait for summary page
  await frame.waitForSelector(`#DataTable1`);

  // Get content of last <td> in last <tr> in <table> #DataTable1
  const lastReadingRaw = await frame.evaluate(() => {
    const table = document.querySelector("#DataTable1");
    const lastRow = table.querySelector("tbody tr:last-child");
    const lastCell = lastRow.querySelector("td:last-child");
    return lastCell.textContent;
  });

  const kWhDifference = parseFloat(lastReadingRaw.replace(/[\n\skWh]/g, "").replace(',', '.'));
  console.log("Power consumed since previous reading", chalk.green(kWhDifference + "kWh") + ".");

  // Submit the final results
  // <input onclick="submitDataForm('meter_save.sap','meterForm')" class="sapBtnEmph" type="button" value="Save" title="Transfer Data">
  await frame.click(`input[value="Save"]`);

  // await page.waitForTimeout(1000000);
  // Close the browser
  await browser.close();
};
