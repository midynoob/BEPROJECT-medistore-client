export const initialState = {
  user: null,
  userInfo: null,
  treatments: [],
  treatmentPageInfo: null,
  docs: [],
  alldocs: [],
  patients: [],
  patientsTreatments: [],
  patientTreatments: [],
  alltreatments: [],
  doctors: []


};


const reducer = (state,action) => {
  ////Users
  switch(action.type) {
    case 'SET_USER':
      return{
        ...state, 
        user: action.user
      }

    case 'ADD_USERINFO':
      console.log("UserInfo is " , action.userInfo)
      return{
        ...state,
        userInfo: action.userInfo
      }

    ////Documents
    case 'SET_DOCS':
      return{
        ...state, 
        docs: action.docs
      }

    case 'ADD_DOC':
      console.log('New Doc is', action.doc)
      if(state.docs.length === 0) {
        return {
          ...state,
          docs: [action.doc]
        }
      } else {
        return{
          ...state, 
          docs: [action.doc,...state.docs]
        }
      }

    case 'ADD_ALLDOC':
      console.log('New Doc is', action.doc)
      if(state.alldocs.length === 0) {
        return {
          ...state,
          alldocs: []
        }
      } else {
        return{
          ...state, 
          alldocs: [action.doc,...state.alldocs]
        }
      }

    case 'SET_ALLDOCS':
      return {
        ...state,
        alldocs: action.docs
      }

    case 'SET_DOCTORS':
      console.log("Treatments is " , action.doctors)
      return{
        ...state,
        doctors: action.doctors
      }
      
    case 'ADD_DOCTOR':
      console.log("Treatments is " , action.doctor)
      return{
        ...state,
        doctors: [action.doctor, ...state.doctors]
      }
    
    ////Treatments
    case 'ADD_TREATMENTS':
      console.log("Treatments is " , action.treatments)
      return{
        ...state,
        treatments: action.treatments
      }
    
    case 'ADD_TREATMENT':
      console.log("New Treatment is " , action.treatment)
      return{
        ...state,
        treatments: [action.treatment, ...state.treatments]
      }


    ////PatientsDoctorSIde
    case 'ADD_PATIENTS':
      console.log("Patients is " , action.patients)
      return{
        ...state,
        patients: action.patients
      }
    
    case 'ADD_PATIENTTREATMENTS':
      console.log("Patients is " , action.treatments)
      return{
        ...state,
        patientTreatments: action.treatments
      }

    case 'SET_ALLTREATMENTS':
      console.log("Patients is " , action.alltreatments)
      return{
        ...state,
        alltreatments: action.alltreatments
      }
    
    default:
      return state;
  }
}

export default reducer;