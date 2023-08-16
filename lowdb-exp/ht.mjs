// These lines make "require" available
import { createRequire } from "module";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
const require = createRequire(import.meta.url);
const html2json = require('html2json').html2json;

const db = new Low(new JSONFile('contact.json'))
await db.read()
db.data ||= { forms: [] } 
const forms = db.data.forms

// const buttonGroup = /*html*/`
// <select v-scope="{bool : false, test() { console.log('hello'); }}" v-cloak _atchange="test" :class="bool" class="form-select" aria-label="Default select example">
//   <option selected>Open this select menu</option>
//   <option value="1">One</option>
//   <option value="2">Two</option>
//   <option value="3">Three</option>
// </select>
// `

const formGroup = /*html*/`
<fieldset id="bskTestForm" v-scope="FormLogic()">
  <span style="display: none">
    <input name="ContactField$ContactField" type="text" id="ContactField_ContactField" autocomplete="contactfield">
    <input name="Interest$Interest" type="text" id="Interest_Interest">
  </span>
  <div class="mb-3">
    <label for="Enquiry_Type_Enquiry_Type" class="form-label">Nature of Enquiry <span class="required">*</span></label>
    <select name="Enquiry_Type$Enquiry_Type"
      id="Enquiry_Type_Enquiry_Type" class="form-select" thankyoupagequerystring="EnquiryType">
      <option value="">Please Select...</option>
      <option value="General Enquiry">General Enquiry</option>
    </select>
    <span id="Enquiry_Type_Enquiry_Type_Validation" style="color:Red;display:none;">*</span>
  </div>
  <!-- MAKE & MODEL FIELDS IF PART OF QUERY STRING -->
  <div class="mb-3">
    <label for="Dealership_Dealership" class="form-label">Send Enquiry to <span class="required">*</span></label>
    <select name="Dealership$Dealership"
      id="Dealership_Dealership"
      class="form-select" thankyoupagequerystring="DealerID">
      <option value="">Please Select...</option>
      <option value="8685">Boilerplate</option>
    </select>
    <span id="Dealership_Dealership_Validation" style="color:Red;display:none;">*</span>
  </div>
  <div class="mb-3">
    <label for="Client_Name_Client_Name" class="form-label">Your Name <span class="required">*</span></label>
    <input name="Client_Name$Client_Name" type="text" id="Client_Name_Client_Name" class="form-control">
    <span id="Client_Name_Client_Name_Validation" style="color:Red;display:none;">*</span>
  </div>
  <div class="mb-3">
    <label for="Email_Address_Email_Address" class="form-label">Email Address <span class="required">*</span></label>
    <input name="Email_Address$Email_Address" type="text" maxlength="300" id="Email_Address_Email_Address"
      class="form-control">
    <span id="Email_Address_Email_Address_Validation" style="color:Red;display:none;">*</span><span
      id="Email_Address_Email_Address_ValidationExpression" style="color:Red;display:none;">Email Address is
      invalid</span>
  </div>
  <div class="mb-3">
    <label for="Phone_Number_Phone_Number" class="form-label">Telephone Number <span class="required">*</span></label>
    <input name="Phone_Number$Phone_Number" type="text" id="Phone_Number_Phone_Number" class="form-control">
    <span id="Phone_Number_Phone_Number_Validation" style="color:Red;display:none;">*</span>
  </div>
  <div class="mb-3">
    <label for="Company_Company" class="form-label">Company</label>
    <input name="Company$Company" type="text" id="Company_Company" class="form-control">
  </div>
  <!-- SERVICE / PARTS FIELDS IF ENQUIRY TYPE SELECTED FROM DROPDOWN -->
  <div class="mb-3">
    <label for="Comments_Comments" class="form-label">Your Enquiry</label>
    <textarea name="Comments$Comments" rows="5" cols="20" id="Comments_Comments" class="form-control"></textarea>
  </div>
  <div class="mb-3">
    <p>Please select all the methods by which you are happy to be contacted by Boilerplate in future:</p>
    <div class="form-check">
      <span class="cog-form-check-input" thankyoupagequerystring="PostOptIn"><input id="PostOptIn_PostOptIn"
          type="checkbox" name="PostOptIn$PostOptIn"></span>
      <label class="form-check-label" for="PostOptIn_PostOptIn">Letter</label>
    </div>
    <div class="form-check">
      <span class="cog-form-check-input" thankyoupagequerystring="SMSOptIn"><input id="SMSOptIn_SMSOptIn"
          type="checkbox" name="SMSOptIn$SMSOptIn"></span>
      <label class="form-check-label" for="SMSOptIn_SMSOptIn">SMS</label>
    </div>
    <div class="form-check">
      <span class="cog-form-check-input" thankyoupagequerystring="PhoneOptIn"><input id="PhoneOptIn_PhoneOptIn"
          type="checkbox" name="PhoneOptIn$PhoneOptIn"></span>
      <label class="form-check-label" for="PhoneOptIn_PhoneOptIn">Phone</label>
    </div>
    <div class="form-check">
      <span class="cog-form-check-input" thankyoupagequerystring="EmailOptIn"><input id="EmailOptIn_EmailOptIn"
          type="checkbox" name="EmailOptIn$EmailOptIn"></span>
      <label class="form-check-label" for="EmailOptIn_EmailOptIn">Email</label>
    </div>
  </div>
  <div class="mb-3">
    <!-- Please do not change the SendEmailFromClientAddress without talking to a senior first. -->
    <input type="submit" name="COGFormSubmit$Submit" value="Send your enquiry" _atclick.prevent="submitForm"
      id="COGFormSubmit_Submit" class="btn btn-primary gtm-track--submit_contact">
    <div id="COGFormSubmit_NoBot1">
      <span id="COGFormSubmit_NoBot1_NoBot1_NoBotLabel"></span><input type="hidden"
        name="COGFormSubmit$NoBot1$NoBot1_NoBotExtender_ClientState"
        id="COGFormSubmit_NoBot1_NoBot1_NoBotExtender_ClientState" value="-913">
    </div>
  </div>
</fieldset>
`

const json = html2json(formGroup);
console.log(json)

db.data.forms.push(json)
await db.write()