import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";

var totalCredit = 0
var totalCreditXGP = 0
var totalFinalCredit = 0
var totalFinalCreditXGP = 0
var cgpa = 0
var sgpa = 0
const initialState = {
    "semester": {
        "1": {
            "18MAT11": {
                credit: 4,
                marks: 69,
            },
            "18CHE12": {
                credit: 4,
                marks: 63
            },
            "18CPS13": {
                credit: 3,
                marks: 61
            },
            "18ELN14": {
                credit: 3,
                marks: 55
            },
            "18ME15": {
                credit: 3,
                marks: 68
            },
            "18CHEL16": {
                credit: 1,
                marks: 93
            },
            "18CPL17": {
                credit: 1,
                marks: 96
            },
            "18EGH18": {
                credit: 1,
                marks: 69
            }
        },
        "2": {
            "18MAT21": {
                credit: 4,
                marks: 80
            },
            "18PHY22": {
                credit: 4,
                marks: 54
            },
            "18ELE23": {
                credit: 3,
                marks: 66
            },
            "18CIV24": {
                credit: 3,
                marks: 75
            },
            "18EGDL25": {
                credit: 3,
                marks: 91
            },
            "18PHYL26": {
                credit: 1,
                marks: 91
            },
            "18ELEL27": {
                credit: 1,
                marks: 86
            },
            "18EGH28": {
                credit: 1,
                marks: 54
            }
        }
        // "4": {},
        // "5": {},
        // "6": {},
        // "7": {},
        // "8": {}

    }
}


const getGP = (marks) => {
    if (marks >= 90 && marks <= 100) {
        return 10
    } else if (marks >= 80 && marks < 90) {
        return 9
    } else if (marks >= 70 && marks < 80) {
        return 8
    } else if (marks >= 60 && marks < 70) {
        return 7
    } else if (marks >= 45 && marks < 60) {
        return 6
    } else if (marks >= 40 && marks < 45) {
        return 4
    } else {
        return 0
    }
}


export const calculateCGPA = createAsyncThunk('addSubject', async (_, thunkAPI) => {
    const state = thunkAPI.getState().cgpa
    totalFinalCredit = 0
    totalFinalCreditXGP = 0
    for (var semester in state.semester) {
        totalCredit = 0
        totalCreditXGP = 0
        sgpa = 0

        for (var subject in state.semester[semester]) {
            if (subject != "sgpa") {
                totalCredit += state.semester[semester][subject].credit
                totalCreditXGP += getGP(state.semester[semester][subject].marks) * state.semester[semester][subject].credit
            }

        }
        if (totalCreditXGP != 0) {
            sgpa = totalCreditXGP / totalCredit
        }

        thunkAPI.dispatch(updateSGPA({ semester, sgpa }))
        totalFinalCredit += totalCredit
        totalFinalCreditXGP += totalCreditXGP
    }
    if (totalFinalCreditXGP != 0) {
        cgpa = totalFinalCreditXGP / totalFinalCredit
    }
    return cgpa
})

export const cgpaSlice = createSlice({
    name: 'cgpaSlice',
    initialState,
    reducers: {
        addSemester: (state, action) => {
            state.semester[action.payload.semester] = {}
        },
        addSubject: (state, action) => {

            var subjectObject = {}
            subjectObject[action.payload.subData.name] = {
                credit: Number(action.payload.subData.credit),
                marks: Number(action.payload.subData.marks)
            }
            state.semester[String(action.payload.sem)] = { ...state.semester[String(action.payload.sem)], ...subjectObject }
        },
        removeSubject: (state, action) => {

            delete state.semester[String(action.payload.semester)][action.payload.subject]

        },
        removeSemester: (state, action) => {
            delete state.semester[String(action.payload.semester)]
        },
        updateSGPA: (state, action) => {
            state.semester[action.payload.semester].sgpa = action.payload.sgpa
        }
    },
    extraReducers: {
        [calculateCGPA.fulfilled]: (state, action) => {
            state.cgpa = action.payload
        }
    }
})

export const selectAllSemester = (state) => state.cgpa.semester
export const CGPA = (state) => state.cgpa.cgpa

// export const selectSemester = createSelector(
//     [selectAllSemester, (state, semesterId) => semesterId],
//     (AllSemester, semesterId) => AllSemester[semesterId])

export const { addSubject, addSemester, removeSubject, removeSemester, updateCGPA, updateSGPA } = cgpaSlice.actions

export default cgpaSlice.reducer;