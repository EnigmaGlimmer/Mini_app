import * as Yup from 'yup';
import { useFormik } from 'formik';
import React  from 'react';
import { styled } from 'styled-components';

import { AuthApi } from '@/api';
import { Button } from '../Button';
import { Colors } from '../../styles/theme';
import useToast from '@/hooks/useToast';
import { InputBox } from '@components/login/InputBox';
import DetailPageWrapper from '../DetailPageWrapper';

export const Security = (props) => {
    const { onBack, title, detailScrollRef } = props;

    const { addToast } = useToast();

    const handleSubmit = async (values) => {
        try {
            const { password, confirmPassword } = values;
            await AuthApi.changePassword({ newPassword: password, confirmPassword });
            addToast("Updated password", { type: "success" });
        } catch (error) {
            console.log("[Error] Change Password Failed:", error);
            addToast(error?.message || error?.toString());
        }
    };

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string()
                .required("Please Verification Code"),
            password: Yup.string()
                .required("Please Enter New Password")
                .min(8, 'Password must be 8 characters long')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[a-z]/, 'Password requires a lowercase letter')
                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                .matches(/[^\w]/, 'Password requires a symbol'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),
        onSubmit: async (values) => {
            handleSubmit(values);
        }
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        await formik.setFieldValue(name, value);
    }

    return (
        <DetailPageWrapper onBack={onBack} title={title} ref={detailScrollRef}>
            <div className="flex-col-center inner-content pt-2">
                <div className="d-grid no-scroll pb-4 w-100">
                    <div className="d-grid align-items-center gap-4 mb-4">
                        <InputBox
                            type="text"
                            placeholder="Old Password"
                            name="oldPassword"
                            value={formik.values.oldPassword}
                            onChange={handleChange}
                            isError={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
                            helperText={formik.errors.oldPassword}
                        />
                        <InputBox
                            type="password"
                            placeholder="New Password"
                            name="password"
                            value={formik.values.password}
                            onChange={handleChange}
                            isError={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.errors.password}
                        />
                        <InputBox
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={handleChange}
                            isError={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                            helperText={formik.errors.confirmPassword}
                        />
                        <HelperText>
                            <div>The password need to be:</div>
                            <div style={{ marginLeft: '0' }}>
                                <li>At least 8 characters</li>
                                <li>At least one number</li>
                                <li>At least one symbol</li>
                                <li>At least one upper and one lower case letter</li>
                            </div>
                        </HelperText>
                    </div>
                    <div className="d-flex justify-content-center w-100">
                        <Button
                            disabled
                            title="Change Password"
                            onClick={formik.handleSubmit}
                            background={Colors.primary_600}
                        />
                    </div>
                </div>
            </div>
        </DetailPageWrapper>
    );
};

const HelperText = styled.div`
    font-family: "Space Grotesk";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    color: ${Colors.neutral_500};
    margin-top: 8px;
`;