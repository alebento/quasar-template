<template>
  <div class="login-page items-center">
    <div class="login-column items-center justify-center">
      <div class="login-box">
        <q-form
          class="q-gutter-lg"
          @submit="onSubmit"
        >
          <q-input
            v-model="login"
            color="secondary"
            label="Login"
          />

          <q-input
            v-model="password"
            color="secondary"
            type="password"
            label="Password"
          />

          <div>
            <q-btn class="login-button" label="Login" type="submit" color="secondary" />
          </div>
        </q-form>
      </div>
    </div>

    <div class="image-column" style="opacity:.4">
      image
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { authService } from 'src/core/services/auth-service';

export default defineComponent({
    name: 'LoginPage',

    setup() {
        const $q = useQuasar();
        const $router = useRouter();

        const login = ref(null);
        const password = ref(null);
        const accept = ref(false);

        return {
            login,
            password,
            accept,

            async onSubmit() {
                if (!login.value || !password.value) {
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'Login and/or password incorrect(s)',
                    });
                } else {
                    await authService.authenticate({
                        username: login.value,
                        password: password.value,
                    });

                    $router.push('/home');
                }
            },
        };
    },
});
</script>

<style>
.login-page{
  display: flex;
  flex: 1;
  height: 100vh;
}

.login-column{
  display: flex;
  flex-direction: column;
  flex: 0.3;
  height: 100%;
  background: rgba(0,0,0,.2);
}

.login-box{
    width: 60%;
    padding: 32px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .6);
}

.login-button{
    width: 100%;
}

.image-column{
  display: flex;
  flex: 0.7;
  height: 100%;
}
</style>
